/**
 * Created by BackEnd Team SelectDine on 8/30/2016.
 * Restaurant Schema design using Mongoose on top of MongoDB
 */

var mongoose = require('mongoose');
var filters = require('./filter');
var menu = require('./menu');
var facility = require('./facility');

// Restaurant Schema variable
var restaurant_schema = {
  _id : { type : String , required:true , unique: true  },

     // Customer Reviews
    customer_reviews : {
        names : { type: Array } ,
        reviews : { type: Array }
     } ,

    // basic Profile Key
    profile : {
        name : { type: String , required: true } ,
        email : { type: String , required: true ,  match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ } ,
        pictures : { type: Array , match: /^http:\/\//i } ,
        address : { type: String , required: true } ,
        description : { type: String , required: true } ,
        phone : { type: Number , required: true } ,
    },

    // Confidential data
    confidential : {
     oauth: { type: String } ,
     password: { type: String , required: true }
    } ,

    // Filters schema nest
   filter : filters.filter_schema ,

   // Menu Card Schema nest
    menu_card : menu.menu_schema ,

    // Facilities schema nest
    facilities : facility.facility_schema ,

    // layout : layout.layout_schema 

    // Restaurant Status Key
  status : {
      online : { type: Boolean ,required: true },
      table_status : {
           tables : { type: Array , required: true },
          state : { type: Array , required: true }
                     }
  } , 



};

var rest_schema = new mongoose.Schema(restaurant_schema);  // Mongoose Restaurant Schema
rest_schema.index({ 'profile.name' : 'text' });    // Index creation for profile.name field to have text based search

// Exporting schema as a module ...
module.exports = rest_schema;
module.exports.restaurant_schema = restaurant_schema;



