var Subject = require('../models/subject');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new Subject({
        name: 'Sabak',
        topics: ['58c5a491a2fb1919054ebbe8','58c5a491a2fb1919054ebbe9']
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