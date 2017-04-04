var Test = require('../models/test');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    new Test({
        question: "If Log<sub>x</sub> (1 / 8) = - 3 / 2, then x is equal to",
        a: '-4',
        b: '4',
        c: '1/4',
        d: '10',
        correct: '4'
    }),
    new Test({
        question: 'If Log <sub>4</sub> (x) = 12, then log <sub>2</sub> (x / 4) is equal to',
        a: '11',
        b: '48',
        c: '-12',
        d: '22',
        correct: '22'
    }),
    new Test({
        question: 'Calculate log<sub>3</sub>27',
        a: '2',
        b: '1',
        c: '27',
        d: '3',
        correct: '3'
    }),
    new Test({
        question: 'Solve log(x + 3) + log(x) = 1.',
        a: '-5,2',
        b: '2',
        c: '10',
        d: '7',
        correct: '2'
    }),
    new Test({
        question: 'Solve log(3x +1) = 5.',
        a: '4/3',
        b: '8',
        c: '300',
        d: '33 333',
        correct: '33 333'
    }),
    new Test({
        question: 'Solve log<sub>x</sub>81 =4 for x.',
        a: '3',
        b: '9',
        c: '20.25',
        d: '324',
        correct: '3'
    }),
    new Test({
        question: 'log<sub>7</sub> (1/2401)',
        a: '7',
        b: '-3',
        c: '-4',
        d: '9',
        correct: '-4'
    }),
    new Test({
        question: 'Simplify: 1/logab(abc) + 1/logbc(abc) + 1/logac(abc)',
        a: '0',
        b: '1',
        c: '2',
        d: 'abc',
        correct: '2'
    }),
    new Test({
        question: 'Simplify: log43 × log24364',
        a: '3/5',
        b: '2/5',
        c: '3/4',
        d: '1/3',
        correct: '3/5'
    }),
    new Test({
        question: 'Find the value of x which satisfies the given expression<br>[log<sub>10</sub>2 + log (4x + 1) = log (x + 2+ 1]',
        a: '6',
        b: '7',
        c: '-6',
        d: '-9',
        correct: '-9'
    })
];

var products2 = [
    new Test({
        question: "Find x, If X - 20 = 80",
        a: 'X = 120',
        b: 'X = 80',
        c: 'X = 60',
        d: 'X = 100',
        correct: 'X = 100'
    }),
    new Test({
        question: 'Find x, If X + 15 = 75',
        a: 'X = 150',
        b: 'X = 25',
        c: 'X = 35',
        d: 'X = 60',
        correct: 'X = 60'
    }),
    new Test({
        question: 'Find x, If 5X = 30',
        a: 'X = 6',
        b: 'X = 150',
        c: 'X = 25',
        d: 'X = 35',
        correct: 'X = 6'
    }),
    new Test({
        question: 'Find Y, If 21 = Y - 4',
        a: 'Y = 54',
        b: 'Y = 25',
        c: 'Y = 50',
        d: 'Y = -40',
        correct: 'Y = 25'
    }),
    new Test({
        question: 'Find Y, If 47 = Y + 7',
        a: 'Y = 40',
        b: 'Y = 54',
        c: 'Y = 50',
        d: 'Y = -40',
        correct: 'Y = 40'
    }),
    new Test({
        question: 'Find Y, If -9 = Y - 11',
        a: 'Y = 20',
        b: 'Y = -2',
        c: 'Y = 2',
        d: 'Y = -20',
        correct: 'Y = 2'
    }),
    new Test({
        question: 'Find X, If X/9 = 11',
        a: 'X = 20',
        b: 'X = 2',
        c: 'X = 99',
        d: 'X = 81',
        correct: 'X = 99'
    }),
    new Test({
        question: 'Find X, If 6X = - 42',
        a: 'X = 7',
        b: 'X = 48',
        c: 'X = -7',
        d: 'X = -48',
        correct: 'X = -7'
    }),
    new Test({
        question: 'Find X, If 63 = 7X',
        a: 'X = 70',
        b: 'X = 7',
        c: 'X = 9',
        d: 'X = -9',
        correct: 'X = 9'
    }),
    new Test({
        question: 'Find x, If X/10 = 3',
        a: 'Y = 54',
        b: 'Y = 25',
        c: 'Y = 50',
        d: 'Y = -40',
        correct: 'Y = 25'
    })
];

var products3 = [
    new Test({
        question: "If x<sup>4</sup> - 3x + 5 is divided by 2x - 1, then remainder is<br>",
        a: '35⁄16<',
        b: '−35⁄16',
        c: '−9',
        d: '3',
        correct: '-9'
    }),
    new Test({
        question: 'Solution of a quadratic equation x<sup>2</sup>+ 5x - 6 = 0',
        a: 'x = -1, x = 6',
        b: 'x = 1, x = - 6',
        c: 'x = 1',
        d: 'x = 6',
        correct: 'x = 1, x = - 6'
    }),
    new Test({
        question: 'If a < 0, then function ƒ(x) = a x<sup>2</sup> + bx + c has',
        a: 'maximum value',
        b: 'minimum value',
        c: 'constant value',
        d: 'positive value',
        correct: 'maximum value'
    }),
    new Test({
        question: 'If roots of x<sup>2</sup> - 5x + a = 0 are equal, then a =',
        a: '25/5',
        b: '±25/4',
        c: '25/4',
        d: 'None of Above',
        correct: '25/4'
    }),
    new Test({
        question: 'If x<sup>2</sup> - 7x + a has a remainder 1 when divided by x + 1, then',
        a: 'a = -7',
        b: 'a = 7',
        c: 'a = 0',
        d: 'a = 1',
        correct: 'a = -7'
    }),
    new Test({
        question: 'If roots of p<sup>2</sup> + qx + 1 = 0 are equal, then',
        a: 'q2 - 4p = 0',
        b: 'q2 - 4p = 0',
        c: 'p2 - 4p = 0',
        d: 'p2 + 4q = 0',
        correct: 'q2 - 4p = 0'
    }),
    new Test({
        question: 'For a quadratic equation ax<sup>2</sup> + bx + c sum of root is',
        a: 'b/a',
        b: '−b/a',
        c: 'c/a',
        d: 'None of Above',
        correct: 'c/a'
    }),
    new Test({
        question: 'If x<sup>3</sup> + 9x +5 is divided by x, then remainder is',
        a: '9',
        b: '0',
        c: '-9',
        d: '5',
        correct: '5'
    }),
    new Test({
        question: 'Sum and product of roots of equation x<sup>2</sup> - kx + k<sup>2</sup> = 0 are',
        a: 'k, k2',
        b: 'k2, k',
        c: '−k, k2',
        d: 'k, −k2',
        correct: 'k, k2'
    }),
    new Test({
        question: 'Sum and product of roots of equation 4x<sup>2</sup> + 7x -3 = 0 are',
        a: '−3/4, −7/4',
        b: '−7/4, −3/4',
        c: '−7/4, 3/4',
        d: 'None of Above',
        correct: '−7/4, −3/4'
    })
];

var done=0;
for(var i=0; i < products3.length; i++){
    products3[i].save(function(err, result) {
        done++;
        if(done === products3.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}