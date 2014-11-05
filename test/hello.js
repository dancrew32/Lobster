var assert = require('assert');

describe('Tests', function() {
    it('should work', function() {
		assert.ok(true, 'true should be true');
	});
});

describe('Filters', function() {
	var Filters = require('../lib/filter');
	var input = [
		'foo.txt',
		'cheese.png',
		'wat.pdf'
	];

	describe('PDF Checker', function() {
		it('should filter pdfs', function() {
			var expected = ['wat.pdf'];
			var out = Filters.is_pdf_extension(input);
			assert.deepEqual(out, expected, 'should be only one pdf');
		});
	});

	describe('Prefix Adder', function() {
		it('should add prefixes to paths', function() {
			var prefix = 'test';
			var expected = [
				'test/foo.txt',	
				'test/cheese.png',
				'test/wat.pdf'
			];
			var out = Filters.add_prefix(input, prefix).then(function(out) {
				assert.deepEqual(out, expected, 'should have had test prepended as a path');
			});
		});
	});

});
