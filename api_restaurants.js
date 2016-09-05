var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    var api = express.Router();
    api.use(bodyparser.json());

    api.get('/restaurant/id/:id', wagner.invoke(function(Restaurant) {
        return function(req, res) {
            Restaurant.find({_id: req.params.id}).
            exec(handleOne.bind(null, 'restaurant', res));
        };
    }));

    api.get('/restaurant/category/:id', wagner.invoke(function(Restaurant) {
        return function(req, res) {
            var sort = { name: 1 };

            Restaurant.
            find({ 'profile.category.ancestors': {$in :[ req.params.id ] } }).
            sort(sort).
            exec(handleMany.bind(null, 'restaurants', res));
        };
    }));

    api.get('/restaurant/text/:query', wagner.invoke(function(Restaurant) {
        return function(req, res) {
            Restaurant.
            find(
                { $text : { $search : req.params.query } },
                { score : { $meta: 'textScore' } }).
            sort({ score: { $meta : 'textScore' } }).
            limit(10).
            exec(handleMany.bind(null, 'restaurants', res));
        };
    }));

    api.get('/restaurant/all', wagner.invoke(function(Restaurant) {
        return function(req, res) {
            var sort = { name: 1 };

            Restaurant.
            find().
            sort(sort).
            exec(handleMany.bind(null, 'restaurants', res));
        };
    }));

    return api;
};

function handleOne(property, res, error, result) {
    if (error) {
        return res.
        status(status.INTERNAL_SERVER_ERROR).
        json({ error: error.toString() });
    }
    if (!result) {
       return res.
       status(status.NOT_FOUND).
      json({ error: 'No such Restaurant found lol' });
    }

    var json = {};
   json[property] = result;
    res.json(json);
}

function handleMany(property, res, error, result) {
    if (error) {
        return res.
        status(status.INTERNAL_SERVER_ERROR).
        json({ error: error.toString() });
    }

    var json = {};
    json[property] = result;
    res.json(json);
}
