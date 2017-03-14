var Topic = require('../models/topic');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new Topic({
        name: 'Bir',
        tests: ['58c5a24fd92f8b17c226dfcd','58c5a24fd92f8b17c226dfd7'],
        theory: 'Bir Eki Ush tort bes alty'
    }),
    new Topic({
        name: 'Eki',
        tests: ['58c5a24fd92f8b17c226dfd2','58c5a24fd92f8b17c226dfdc'],
        theory: 'Eki Ush tort bes alty Jety segiz togiz'
    }),
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