var Promise = require('bluebird');

function is_pdf_extension(list) {
	return list.filter(function(item) {
		return /pdf$/.test(item);
	});
};

function add_prefix(list, pre) {
	return new Promise(function(resolve) {
		var _join = require('path').join;	
		for (var i in list)
			list[i] = _join(pre, list[i]);
		resolve(list);
	});
}

module.exports = {
	is_pdf_extension: is_pdf_extension,
	add_prefix: add_prefix
};
