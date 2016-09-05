var mongoose = require('mongoose');


    mongoose.connect('mongodb://localhost:27017/selectdine');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var Category = mongoose.model('Category', require('./category'), 'category');
        var Restaurant = mongoose.model('restaurant', require('./restaurant'), 'restaurant');
        var User = mongoose.model('user', require('./user'), 'user');

        var  cat1 = new Category({_id:"icecream" , parent: "brand" , ancestors:["finedine","brand"]});

        var  rest1  = new Restaurant({_id:"1003si" ,profile: { name:"Dominos Pizzas , Vellore",
            login_id: "dominos_vlr",
            pictures:"http://somelink" ,
            category: { _id:"pizza" ,parent:"brand",  ancestors:["finedine","brand","icecream"] } },
            confidential: {
            password:"some_password" ,
            oauth: "Facebook unique ID" } });

        var user = new User({
            _id: "1001si",
            profile: { name:"Harshith HM 02" , email:"hmharshith@yahoo.com" , phone:9943639211 , pictures:"http://somelink" },
            confidential: {password:"abcd" , oauth:"facebook ID"}
        });

     //   Restaurant.update({_id: '1003si'}, {$set: {'profile.category.ancestors': ["finedine","brand","pizza"]}} , function(error,res)
       //   {if(error) { console.log('some error');}});

         user.save(function(err){if(!err){ console.log('Succesfully inserted a category ');} else { console.log(err); }});

    });
