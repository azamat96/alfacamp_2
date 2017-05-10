var express = require('express');
var router = express.Router();
var Subject = require('../models/subject');
var Topic = require('../models/topic');
var Test = require('../models/test');
var multer = require('multer');
//var upload = multer({dest: 'public/uploads/'});
var fs = require('fs');

router.get('/login',function (req, res, next) {
    res.render('admin/login');
});

router.post('/login',function (req, res, next) {
    if (!req.body.email || !req.body.password){
        return res.render("admin/login", {success: false, msg: "Заполните все поля"});
    }
    else if(req.body.email=='aza' && req.body.password=='aza'){
        return res.cookie('email', 'aza').redirect('/admin');
    }
    res.render('admin/login', {success: false, msg: "Такого ползователя нет"});
});

var checkCookie = function (req, res, next) {
    if(req.cookies.email=='aza') {
        next();
    } else{
        return res.redirect('/admin/login');
    }
};

router.use(checkCookie);

/*================= GET home page. ====================*/
router.get('/', function(req, res, next) {
    Subject.find({}).select('name').exec(function (err, subject) {
        if (err) return next(err);
        res.render('admin/index', {subject: subject});
    });
});

/*=========INSERT Subject========*/
router.post('/subject', function (req, res, next) {
    if(!req.body.name){
        res.cookie('msg', 'Before inserting: <i>Fill out the inputs</i>');
        res.cookie('type', 'error');
        return res.redirect('/admin');
    }
    var subject = new Subject(req.body);
    subject.save(function(err, subject){
        if(err) next(err);
        res.cookie('msg', 'New Subject: <i>'+req.body.name+'</i> inserted successfully');
        res.cookie('type', 'ok');
        res.redirect('/admin');
    });
});

/*=========MORE INFO Subject=======*/
router.get('/subject/:id', function (req, res, next) {
    Subject.findById(req.params.id).populate('topics', 'name').exec(function (err, subject) {
        if (err) return next(err);
        res.render('admin/subject_in', subject);
    });
});

/*========UPDATE Subject========*/
router.post('/subject/:id', function (req, res, next) {
    Subject.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if(err) return next(err);
        res.cookie('msg', 'Subject: <i>'+req.body.name+'</i> updated successfully');
        res.cookie('type', 'ok');
        res.redirect('/admin/subject/'+req.params.id);
    });
});

/*========DELETE Subject=========*/
router.get('/subject/:id/del', function (req, res, next) {
    Subject.findByIdAndRemove(req.params.id, function (err, response) {
        if(err) return next(err);
        response.topics.forEach(function (id) {
            Topic.delTopic(id, function (err, topic) {
                if (err) return next(err);
                //res.redirect('/admin/topic');
            });
        });
        res.cookie('msg', 'Subject: <i>'+response.name+'</i> deleted successfully');
        res.cookie('type', 'ok');
        res.redirect('/admin');
    });
});

/*================= TOPICS. ====================*/
router.get('/topic', function (req, res, next) {
    Topic.find({}).select('name').exec(function (err, topic) {
        if (err) return next(err);
        Subject.find({}).select('name').exec(function (err, subject) {
            if(err) return next(err);
            res.render('admin/topic', {topic: topic, subject: subject});
        });
    });
});

/*=========INSERT Topic========*/
router.post('/topic', function (req, res, next) {
    if (!req.body.name || !req.body.theory){
        res.cookie('msg', 'Before inserting: <i>Fill out the inputs</i>');
        res.cookie('type', 'error');
        if(req.body.sub!=null){
            return res.redirect('/admin/subject/'+req.body.subject_id);
        } else {
            return res.redirect('/admin/topic');
        }
    }
    Topic.addTopic(req, res, next, function (err, subject) {
        if(err) return next(err);
        res.cookie('msg', 'New Topic: <i>'+req.body.name+'</i> inserted successfully');
        res.cookie('type', 'ok');
        if(req.body.sub!=null){
            res.redirect('/admin/subject/'+req.body.subject_id);
        } else {
            res.redirect('/admin/topic');
        }
    });
});

/*=========MORE INFO Topic=======*/
router.get('/topic/:id', function (req, res, next) {
    Topic.findById(req.params.id,"-__v").populate(
        [{path:'tests', select:'question'}, {path:'subject_id', select:'name'}]).exec(function (err, topic) {
        if (err) return next(err);
        res.render('admin/topic_in', {topic: topic});
    });
});

/*========UPDATE Topic========*/
router.post('/topic/:id', function (req, res, next) {
    Topic.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if(err) return next(err);
        res.cookie('msg', 'Topic: <i>'+req.body.name+'</i> updated successfully');
        res.cookie('type', 'ok');
        res.redirect('/admin/topic/'+req.params.id);
    });
});

/*========DELETE Topic=========*/
router.get('/topic/:id/del', function (req, res, next) {
    Topic.delTopic(req.params.id, function (err, topic) {
        if (err) return next(err);
        res.cookie('msg', 'Topic: <i>'+topic.name+'</i> deleted successfully');
        res.cookie('type', 'ok');
        if(req.query.sub!=null){
            res.redirect('/admin/subject/'+topic.subject_id);
        } else {
            res.redirect('/admin/topic');
        }
    });
});

/*=====================INSERT TEST====================*/
router.post('/test/:id', function (req, res, next) {
    // Test.addTest(req, res, next, function (err, topic) {
    //     if(err) return next(err);
    //     res.redirect('/admin/topic/'+req.params.id);
    // });
    if(!req.body.question || !req.body.a || !req.body.b || !req.body.c || !req.body.d || !req.body.correct){
        res.cookie('msg', 'Before inserting: Fill out the inputs');
        res.cookie('type', 'error');
        return res.redirect("/admin/topic/"+req.params.id);
    }
    var test = new Test(req.body);
    test.save(function (err , test) {
        if(err) return next(err);
        Topic.findById(req.params.id, function (err, topic) {
            if (err) throw err;
            topic.tests.push(test._id);
            topic.save(function (err, topic) {
                res.cookie('msg', 'Test: <i>'+req.body.question+'</i> inserted successfully');
                res.cookie('type', 'ok');
                res.redirect("/admin/topic/"+req.params.id);
            });
        });
    });
});

/*========MORE INFO Test=========*/
router.get('/test/:id/:tid', function (req, res, next) {
    Test.findById(req.params.id).exec(function (err, test) {
        if (err) return next(err);
        res.render('admin/test_in', {test: test, tid: req.params.tid});
    });
});

/*========UPDATE Test==========*/
router.post('/test/:id/:tid', function (req, res, next) {
    Test.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if(err) return next(err);
        res.cookie('msg', 'Test: <i>'+req.body.question+'</i> updated successfully');
        res.cookie('type', 'ok');
        res.redirect('/admin/test/'+req.params.id+'/'+req.params.tid);
    });
});

/*=======DELETE Test=========*/
router.get('/test/:id/del/:tid', function (req, res, next) {
    // Test.delTest(req.params.id, req.params.tid,function (err) {
    //     if(err) return next(err);
    //     res.redirect('/admin/topic/'+req.params.tid);
    // });
    Test.findByIdAndRemove(req.params.id, function (err, test) {
        if (err) throw err;
        Topic.findById(req.params.tid, function (err, topic) {
            if(err) throw err;
            topic.tests.remove(req.params.id);
            topic.save(function (err, topic) {
                res.cookie('msg', 'Test: <i>'+test.question+'</i> deleted successfully');
                res.cookie('type', 'ok');
                res.redirect('/admin/topic/'+req.params.tid);
            });
        });
    });
});

router.get('/logout',function (req, res, next) {
    return res.clearCookie('email').redirect('/admin/login');
});

module.exports = router;
