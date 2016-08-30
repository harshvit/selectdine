/**
 * Created by BackEnd Team SelectDine on 8/30/2016.
 * Restaurant Schema design using Mongoose on top of MongoDB
 */

var mongoose = require('mongoose');

facility_schema = {
    parking: { type: Boolean , required:true } ,

    alcohol: { type: Boolean , required:true } ,

    wifi: { type:Boolean , required:true } ,

    halal: { type:Boolean , required:true } ,

    outdoor: { type:Boolean , required:true } ,

    buffet: { type:Boolean , required:true } ,

    veg: { type:Boolean , required:true }
};


module.exports = new mongoose.Schema(facility_schema);
module.exports.facility_schema = facility_schema;