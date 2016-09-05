var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
    mongoose.connect('mongodb://localhost:27017/selectdine');

    var Category =
        mongoose.model('Category', require('./category'), 'category');
    var Restaurant =
        mongoose.model('restaurant', require('./restaurant'), 'restaurant');
    var User =
        mongoose.model('user', require('./user'), 'user');

    var models = {
        Category: Category,
        Restaurant: Restaurant,
        User: User
    };

    // To ensure DRY-ness, register factories in a loop
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    return models;

};
