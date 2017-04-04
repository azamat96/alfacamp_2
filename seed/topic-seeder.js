var Topic = require('../models/topic');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/alfacamp');

var products = [
    // new Topic({
    //     name: 'Logarithm',
    //     tests: [
    //         "58e3da8e9a885a19eff95d80",
    //         "58e3da8e9a885a19eff95d81",
    //         "58e3da8e9a885a19eff95d82",
    //         "58e3da8e9a885a19eff95d83",
    //         "58e3da8e9a885a19eff95d84",
    //         "58e3da8e9a885a19eff95d85",
    //         "58e3da8e9a885a19eff95d86",
    //         "58e3da8e9a885a19eff95d87",
    //         "58e3da8e9a885a19eff95d88",
    //         "58e3da8e9a885a19eff95d89"
    //     ],
    //     theory: '<b>What is a logarithm?</b><br>In mathematics logarithms were developed for making complicated calculations simple. For example, if a right circular cylinder has radius r = 0.375 meters and height h = 0.2321 meters, then its volume is given by: V = A = πr2h = 3.146 × (0.375)2 × 0.2321. Use for logarithm tables makes such calculations quite easy. However, even calculators have functions like multiplication; power etc. still, logarithmic and exponential equations and functions are very common in mathematics.<br><br><b>Definition</b><br><br>If ax = M (M > 0, a > 0, a ≠ 1), then x (i.e., index of the power) is called the logarithm of the number M to the base a and is written as x = log<sub>a</sub> M.Hence, if a<sup>X</sup> = M then x = log<sub>a</sub> M;conversely, if x = log<sub>a</sub> M then a<sup>X</sup> = M.If ‘a’ is a positive real number (except 1), n is any real number and an = b, then n is called the logarithm of b to the base a. It is written as loga b (read as log of b to the base a). Thus,a<sup>n</sup> = b ⇔ log<sub>a</sub> b = n.an is called the exponential form and log<sub>a</sub> b = n is called the logarithmic form. <br><br> <b>For example:</b><br>● 3<sup>2</sup> = 9 ⇔ log<sub>3</sub> 9 = 2<br>● 5<sup>4</sup>= 625 ⇔ log<sub>5</sub>625 = 4<br>● 7<sup>0</sup> = 1 ⇔ log<sub>7</sub> 1 = 0<br>'
    // }),
    new Topic({
        name: 'Linear Equation',
        tests: [
            "58e3e3d385ca4723414019e3",
            "58e3e3d385ca4723414019e4",
            "58e3e3d385ca4723414019e5",
            "58e3e3d385ca4723414019e6",
            "58e3e3d385ca4723414019e7",
            "58e3e3d385ca4723414019e8",
            "58e3e3d385ca4723414019e9",
            "58e3e3d385ca4723414019eb",
            "58e3e3d385ca4723414019ec",
            "58e3e3d385ca4723414019ea"
        ],
        theory: '<b>What is a linear equation?</b><br><br>An equation which involves only one variable whose highest power is 1 is known as a linear equation in that variable.<br><br> <b>For example:</b><br> (a) x + 4 = 19<br>(b) y - 7 = 11<br>(c) x/2 - x/3 = 9<br><br> <b>Definition</b><br><br>The sign of equality divides the equation into two sides. Left hand side or L.H.S. and Right hand side or R.H.S<br>Solution of linear equation or Root of linear equation: The value of the variable which makes left hand side equal to<br>right hand side in the given equation is called the solution or the root of the equation. <br><br> <b>For example:</b><br>x + 1 = 4<br> Here, L.H.S. is x + 1 and R.H.S. is 4<br> If we put x = 3, then L.H.S. is 3 + 1 which is equal to R.H.S.<br>Thus, the solution of the given linear equation is x = 3'
    }),
    new Topic({
        name: 'Roots of a Quadratic Equation',
        tests:[
            "58e3e8f03fe27e2af646a65a",
            "58e3e8f03fe27e2af646a65b",
            "58e3e8f03fe27e2af646a65c",
            "58e3e8f03fe27e2af646a65d",
            "58e3e8f03fe27e2af646a65e",
            "58e3e8f03fe27e2af646a65f",
            "58e3e8f03fe27e2af646a660",
            "58e3e8f03fe27e2af646a661",
            "58e3e8f03fe27e2af646a663",
            "58e3e8f03fe27e2af646a662"
        ],
        theory: '<b>What is a Roots of a Quadratic Equation?</b><br>We will learn how to find the Roots of a quadratic equation.<br><br> <b>Definition</b><br>Every quadratic equation gives two values of the unknown variable and these values are called roots of the equation.Let ax<sup>2</sup>+ bx + c = 0 be a quadratic equation. If aα<sup>2</sup> + bα + c = 0 then α is called a root of the quadratic equation ax<sup>2</sup>+ bx + c = 0.Thus,α is a root of ax<sup>2</sup>+ bx + c = 0 if and only if aα<sup>2</sup>+ bα + c = 0 If aα<sup>2</sup>+ bα + c = 0 then we say x = α satisfies the equation ax<sup>2</sup>+ bx + c = 0 and x = α is a solution.Thus, every solution is root.A quadratic equation has two roots which may be unequal real numbers or equal real numbers, or numbers which are not real.If a quadratic equation has two real equal roots α, we say the equation has only one real solution.<br><br> <b>For example:</b><br>Let 3x<sup>2</sup>+ x - 2 = 0 be a quadratic equation. Clearly,3 ∙ (-1)<sup>2</sup>+ (-1) - 2 = 0So, x = -1 is a root of the quadratic equation 3x<sup>2</sup>+ x - 2 = 0.<br> Similarly, x = 2/3 is another root of the equation.<br> But x = 2 is not a root of 3x<sup>2</sup>+ x - 2 = 0 because 3 ∙ 2<sup>2</sup>+ 2 - 2 ≠ 0.<br>'
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