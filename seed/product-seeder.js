var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new User({
        username: 'Aza',
        email: 'aza@mail.ru',
        password: 'aza'
    }),
    new User({
        username: 'Dus',
        email: 'dus@mail.ru',
        password: 'dus'
    }),
    new User({
        username: 'maks',
        email: 'maks@mail.ru',
        password: 'maks'
    })
]

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