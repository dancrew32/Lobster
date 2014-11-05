var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var spawn = require('child_process').spawn;
var LobFilter = require('./filter');


// CONVERTERS
function pdftk(command) {
	return new Promise(function(resolve) {
		spawn('pdftk', command).stdout.on('close', resolve);
	});
}

function convert(command, delete_after) {
	return new Promise(function(resolve, reject) {
		var child = spawn('convert', command)
		child.stdout.on('data', function(data) {
			resolve(data.toString());
			fs.unlinkAsync(delete_after);
		});
	});
}

function pdf2png(payload, options) {
	var temp_pdf;

	return temp_file()
	.then(function(_temp_pdf) {
		temp_pdf = _temp_pdf;
		return write_temp(temp_pdf, payload);
	})
	.bind(options)
	.then(function() {
		var pattern = this.pdf_path + '/%02d.pdf';
		return pdftk([temp_pdf, 'burst', 'output', pattern]);
	})
	.then(function() {
		return fs.readdirAsync(this.pdf_path)
			.bind(this)
			.then(function(files) {
				pdfs = LobFilter.is_pdf_extension(files);
				return LobFilter.add_prefix(pdfs, this.pdf_path);
			});
	})
	.then(function(pdfs) {
		var self = this;
		return new Promise(function(resolve) {
			var _join = require('path').join;
			var out = [];
			pdfs.forEach(function(pdf, i) {
				var file_name = [self.name, 'thumb', 'page', (i + 1)].join('_') + '.png';
				var server_name = _join(self.server_address, 'thumbs', file_name);
				var to = _join(self.output_path, file_name);
				convert([
					'-density', '150', 
					'-trim', 
					'-quality', '100', 
					'-sharpen', '0x1.0',
					pdfs[i], to
				], pdfs[i]);
				out.push([self.name, server_name]);
			});
			return resolve(out);
		});
	});
};


// FILE UTILS
function temp_file() {
	return new Promise(function(resolve) {
		spawn('mktemp', ['-t', 'lob_file']).stdout.on('data', function(data) {
			resolve(data.toString().trim());
		});
	});
}

function write_temp(path, data) {
	return new Promise(function(resolve) {
		return fs.writeFileAsync(path, data).then(function() {
			resolve(path);
		});		
	});
}

function html(path, data) {
	return fs.readFileAsync(path, 'utf8');
};


// EXPORT
module.exports = {
	html: html,
	pdf2png: pdf2png
};
