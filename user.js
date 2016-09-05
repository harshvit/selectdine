var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    _id:{type:String , required:true },
    profile: {
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        picture: {
            type: String,
            required: true,
            match: /^http:\/\//i
        },
        name:{type:String , required:true },
        email:{type:String , required:true , match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
        phone:{type:Number , match:/\d{10}/}
    },
    confidential: {
        oauth: { type: String, required: true },
        password:{ type: String , required: true }
    }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
