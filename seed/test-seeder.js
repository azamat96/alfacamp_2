var Test = require('../models/test');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new Test({
        question: 'Kalaisyn?',
        answers: [
            {answer: 'jaksi', right: true},
            {answer: 'bolad', right: false},
            {answer: 'jaman', right: false},
            {answer: 'ozin?', right: false},
        ]
    }),
    new Test({
        question: 'Korinbeisyn?',
        answers: [
            {answer: 'jurkkoi', right: true},
            {answer: 'ignor', right: false},
            {answer: 'Almatyda', right: false},
            {answer: 'ozin?', right: false},
        ]
    }),
    new Test({
        question: 'Ne step?',
        answers: [
            {answer: 'jurgen', right: true},
            {answer: 'Aulda', right: false},
            {answer: 'jumis jok', right: false},
            {answer: 'ani-mine', right: false},
        ]
    }),
    new Test({
        question: 'Kaidasyn?',
        answers: [
            {answer: 'uide', right: true},
            {answer: 'aulda', right: false},
            {answer: 'kv-da', right: false},
            {answer: 'ozin?', right: false},
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