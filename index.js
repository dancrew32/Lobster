var Hapi = require('hapi');
var Path = require('path');
var Util = require('./lib/util');
var LobValidator = require('./lib/validate').LobValidator;
var PORT = '8000';
var server = new Hapi.Server('0.0.0.0', PORT);

function thumbnailHandler(request, reply) {
	var errors = new LobValidator(request.payload).errors();
	if (errors)
		return reply(errors);

	var options = {
		name: request.payload.name, 
		pdf_path: Path.resolve('./pdfs'), 
		output_path: Path.resolve('./thumbs'),
		server_address: server.info.uri
	};

	Util.pdf2png(request.payload.file, options).then(reply);
}

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		Util.html(Path.resolve('static/home.html')).then(reply);
	}
});
server.route({
	method: 'POST',
	path: '/upload',
	handler: thumbnailHandler
});
server.route({
	method: 'GET',
	path: '/thumbs/{param*}',
	handler: {directory: {path: 'thumbs'}}
});
server.route({
	method: 'GET',
	path: '/logo.png',
	handler: function (request, reply) {
		reply.file(Path.resolve('static/logo.png'));
	}
});
server.start();
console.log('Lobster @ http://localhost:'+ PORT);
