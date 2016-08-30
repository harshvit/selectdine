/**
 * Created by BackEnd Team SelectDine on 8/30/2016.
 * Menu Schema design using Mongoose on top of MongoDB
 */

var mongoose = require('mongoose');

var menu_schema  = {
    id : { type : String , required : true, unique : true},
    name : { type : String , required: true},

    // Rating for the Food Item
    rating : {
        stars : { type : Array , default : [0,0,0,0,0]}
    } ,

      // Cost of the food item
    cost : {
        actual_cost : {type : Number , required : true },
        discount : { type : Number },
        offer : { type : Number }
    } ,

     // Category of the Food Item
    food_category : {
        food_type : { type: String  } ,
        veg : { type: Boolean  } ,
    }
};

module.exports = new mongoose.Schema(menu_schema);
module.exports.menu_schema = menu_schema;