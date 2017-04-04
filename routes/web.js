var User = require('../models/user');
module.exports = function (router, passport) {

    // Register
    router.get('/register', function (req, res) {
        res.render('register');
    });

    // Login
    router.get('/login', function (req, res) {
        res.render('login');
    });

    // Register User
    router.post('/register', function (req, res) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var password2 = req.body.password2;

        // Validation
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            res.render('register', {
                errors: errors
            });
        } else {
            var newUser = new User({
                email: email,
                username: username,
                password: password
            });

            User.createUser(newUser, function (err, user) {
                if (err) throw err;
                console.log(user);
            });
            res.redirect('/users/login');
        }
    });

    //router.use(passport.authenticate('bearer', {session: false}));
    router.post('/login',
        passport.authenticate('bearer', {successRedirect:'/', failureRedirect:'/users/register',session: false}),
        function (req, res) {
            res.redirect('/');
        });

    router.get('/logout', function (req, res) {
        res.redirect('/users/login');
    });

};
