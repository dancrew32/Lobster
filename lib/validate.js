var Joi = require('joi');

function LobValidator(input) {
	this.input = input;
	this.schema = {
		name: Joi.string().alphanum().min(1).max(200).required(),
		file: Joi.object().required()
	};
};

LobValidator.prototype.errors = function() {
	var errors = Joi.validate(this.input, this.schema);
	if (errors && errors.error) {
		var messages = [];
		errors.error.details.forEach(function(er) {
			messages.push(er.message);
		});
		return messages;
	}
	return false;
};

module.exports = {
	LobValidator: LobValidator
};
