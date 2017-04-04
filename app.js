var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var expressValidator = require('express-validator');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/alfacamp');
require('./config/passport')(passport);

var index = require('./routes/index');
var mobile = require('./routes/mobile');

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

var web = express.Router();
require('./routes/web')(web, passport);

app.use('/users', web);
app.use('/api', mobile);
app.use('/', index);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'),function () {
   console.log('Server started on port '+app.get('port'));
});