const Customer = require('../models/customer');

module.exports.home = function(req, res){
    return res.render('home', {
        title: "This is the title",
        show_enquiry: 'false',
        show_deposit: 'false',
        show_transaction_update: 'false'
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
    return res.redirect('/');
}

module.exports.enquiry = async function(req, res){
    let customer = await Customer.findOne({accountNo: req.body.accountNo});
    
    let currentCustomer = {
        accountNo: customer.accountNo,
        name: customer.name,
        balance: customer.balance
    }
    
    if(customer.passcode == req.body.passcode){
        return res.render('home', {
            show_enquiry: 'true',
            show_deposit: 'false',
            show_transaction_update: 'false',
            customer: currentCustomer,
        });
    }else{

    }
    return res.redirect('/');
}

module.exports.deposit = async function(req, res){
    
    let customer = await Customer.findOne({accountNo: req.body.accountNo});
    if(customer && customer.passcode == req.body.passcode){
        console.log("User found with correct passcode");
        customer.balance = parseInt(customer.balance) + parseInt(req.body.deposit);
        customer.save();

        let currentCustomer = {
            accountNo: customer.accountNo,
            name: customer.name,
            balance: customer.balance
        }

        return res.render('home', {
            title: "This is the title",
            show_enquiry: 'false',
            show_deposit: 'true',
            show_transaction_update: 'false',
            customer : currentCustomer
        });
    }
    return res.redirect('back');
}

module.exports.transaction = async function(req, res){
    let sender = await Customer.findOne({accountNo: req.body.senderAccNo});
    let receiver = await Customer.findOne({accountNo: req.body.receiverAccNo});

    sender.balance = parseInt(sender.balance) - parseInt(req.body.amount);
    receiver.balance = parseInt(receiver.balance) + parseInt(req.body.amount);

    sender.save();
    receiver.save();

    let senderCustomer = {
        accountNo: sender.accountNo,
        name: sender.name,
        balance: sender.balance
    }
    let reveicerCustomer = {
        accountNo: receiver.accountNo,
        name: receiver.name,
    }

    // console.log(sender);
    // console.log(receiver);

    return res.render('home', {
        show_enquiry: 'false',
        show_deposit: 'false',
        show_transaction_update: 'true',
        sender: senderCustomer,
        receiver: reveicerCustomer
    });
}