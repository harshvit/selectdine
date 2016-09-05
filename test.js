var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:2015';

describe('Category API', function() {
    var server;
    var Category;

    before(function() {
        var app = express();

        // Bootstrap server
        models = require('./models_category')(wagner);
        app.use(require('./api_categories')(wagner));

        server = app.listen(2015);

        // Make Category model available in tests
        Category = models.Category;
    });

    after(function() {
        // Shut the server down when we're done
        server.close();
    });

    beforeEach(function(done) {
        // Make sure categories are empty before each test
        Category.remove({}, function(error) {
            assert.ifError(error);
            done();
        });
    });

    it('can load a category by id', function(done) {
        // Create a single category
        Category.create({ id: 'finedine' }, function(error, doc) {
            assert.ifError(error);
            var url = URL_ROOT + '/category/id/finedine';
            // Make an HTTP request to localhost:3000/category/id/Electronics
            superagent.get(url, function(error, res) {
                assert.ifError(error);
                var result;
                // And make sure we got { _id: 'Electronics' } back
                assert.doesNotThrow(function() {
                    result = JSON.parse(res.text);
                });
                assert.ok(result.category);
                assert.equal(result.category._id, 'finedine');
                done();
            });
        });
    });

    it('can load all categories that have a certain parent', function(done) {
        var categories = [
            { id: 'finedine' },
            { id: 'brand', parent: 'finedine' },
            { id: 'Laptops', parent: 'normal' },
            { id: 'Bacon' }
        ];

        // Create 4 categories
        Category.create(categories, function(error, categories) {
            var url = URL_ROOT + '/category/parent/finedine';
            // Make an HTTP request to localhost:3000/category/parent/Electronics
            superagent.get(url, function(error, res) {
                assert.ifError(error);
                var result;
                assert.doesNotThrow(function() {
                    result = JSON.parse(res.text);
                });
                assert.equal(result.categories.length, 1);
                // Should be in ascending order by _id
                assert.equal(result.categories[0]._id, 'brand');
                done();
            });
        });
    });
});
