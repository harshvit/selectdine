var mongoose = require('mongoose');
var Category = require('./category');
var restaurant_schema ={
    _id:{type : String ,required:true },
    profile : {
        name: {type: String, required: true},
        login_id: {type: String, required: true},
        pictures: {type: String, match: /^http:\/\//i},
        category: Category.category_schema
    },
    confidential: {
        oauth: {type: String, select: false },
        password: {type: String, select: false}

    },
    drawspace:{

    }
};
var rest_schema = new mongoose.Schema(restaurant_schema);
rest_schema.index({ 'profile.name' : 'text' });

module.exports = rest_schema;
module.exports.restaurant_schema = restaurant_schema;