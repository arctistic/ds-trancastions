const Customer = require('../models/customer');

module.exports.home = function(req, res){
    return res.render('home', {
        title: "This is the title"
    });
}

module.exports.signin = function(req, res){
    return res.render('signin');
}

module.exports.signup = function(req, res){
    return res.render('signup');
}

module.exports.create = function(req, res){
    Customer.create(req.body);
    console.log(req.body);
    return res.redirect('back');
}
