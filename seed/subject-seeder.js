var Subject = require('../models/subject');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new Subject({
        name: 'Mathematics',
        topics: [
            "58e3e9becb1ded2c245c0d71",
            "58e3eaafb6b5f82c95e42543",
            "58e3eaafb6b5f82c95e42544"
        ]
    })
];

var done=0;
for(var i=0; i < products.length; i++){
    products[i].save(function(err, result) {
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}