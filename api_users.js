var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    var api = express.Router();

    api.get('/users/id/:id', wagner.invoke(function(User) {
        return function(req, res) {
            User.find({_id: req.params.id}).
            exec(handleOne.bind(null, 'User', res));
        };
    }));

    api.get('/user/:id', wagner.invoke(function(User) {
        return function(req, res) {
            var sort = { name: 1 };

            User.
            find({_id: req.params.id}).
            sort(sort).
            exec(handleOne.bind(null, 'User', res));
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
        json({ error: 'No such User found lol' });
    }

    var json = {};
    json[property] = result;
    res.json(json);
}

