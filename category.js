var mongoose = require('mongoose');

var category_schema = {
        _id: {type: String, required: true},
        parent: {type: String, ref:'category' },
        ancestors: {type: Array , ref:'category'}
};

module.exports = new mongoose.Schema(category_schema);
module.exports.category_schema = category_schema;