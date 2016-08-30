/**
 * Created by BackEnd Team SelectDine on 8/30/2016.
 * Filters Schema design using Mongoose on top of MongoDB ( Nested inside Restaurant schema )
 */

var mongoose = require('mongoose');
filter_schema = {

    // Filters based on location (City)
    location: { type: String, required: true } ,

   // filters based on rating ( 1 to 5 ) ... However Avg_Star value is only used for filtering while other keys are about Restaurant Information
    rating: {
        rated_by: { type: Array } ,
        star: { type: Array , default: [0,0,0,0,0] } ,
        avg_star:{   type: Number , required: true } // This value will be the average rating based on star key
        // avg_star = (star[0] + 2*star[1] + 3*star[2] + 4*star[3] +5*star[4])/15 ...
        // We need not store this value as it is calculated using star values ... But we are storing it for better filtering efficiency
       } ,

 // Filters based on standard of Restaurant ... Has only 3 values HIGH , MED and LOW
    price : { type : String , required:true } ,

  //  Type: { has to be added } ,

    // Filters based on timings of restaurant
    timings : { type: String , required: true } ,

    // Filters based on Offers
    offer : {
        name:{ type:String , required:true } ,
        items:{ type:Array , required:true } ,
        offer_date:{ type:Date , required:true }
        // We will need discussion on this particular field like % of discount or it's like buy one get one ...
    }
 //   cuisines : { has to be added }

};

module.exports = new mongoose.Schema(filter_schema);
module.exports.filter_schema = filter_schema;