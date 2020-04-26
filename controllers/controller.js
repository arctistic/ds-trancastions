const Customer = require('../models/customer');

module.exports.home = function(req, res){
    return res.render('home', {
        response: {}
    });
}

module.exports.signup = function(req, res){
    return res.render('signup');
}

module.exports.create = function(req, res){
    Customer.create(req.body);
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
            response: {
                customer: currentCustomer,
                show_enquiry: 'true'
            }
        });
    }
    return res.redirect('/');
}

module.exports.deposit = async function(req, res){
    let customer = await Customer.findOne({accountNo: req.body.accountNo});
    if(customer && customer.passcode == req.body.passcode){
        console.log("User found with correct passcode");
        customer.balance = parseInt(customer.balance) + parseInt(req.body.deposit);
        await customer.save();

        let currentCustomer = {
            accountNo: customer.accountNo,
            name: customer.name,
            balance: customer.balance
        }

        return res.render('home', {
            response: {
                show_deposit: 'true',
                customer: currentCustomer
            }
        });
    }
    return res.redirect('back');
}

module.exports.withdraw = async function(req, res){
    let customer = await Customer.findOne({accountNo: req.body.accountNo});
    
    if(customer && customer.passcode == req.body.passcode){
        
        if(parseInt(req.body.withdraw) > parseInt(customer.balance)){
            console.log("Insufficient");
            return res.render('home', {
                response :{
                    withdraw: 'insufficient',
                    customer: {
                        name: customer.name,
                        balance: customer.balance,
                        accountNo: customer.accountNo
                    }
                }
            });
        }

        customer.balance = parseInt(customer.balance) - parseInt(req.body.withdraw);
        await customer.save();
        let currentCustomer = {
            accountNo: customer.accountNo,
            name: customer.name,
            balance: customer.balance
        }
        console.log(currentCustomer);
        return res.render('home', {
            response: {
                show_withdraw: 'true',
                customer: currentCustomer
            }
        });
    }
    return res.redirect('back');
}

module.exports.transaction = async function(req, res){
    try {
        let sender = await Customer.findOne({accountNo: req.body.senderAccNo});
        let receiver = await Customer.findOne({accountNo: req.body.receiverAccNo});
        
        if(parseInt(req.body.amount) > parseInt(sender.balance)){
            console.log("Insufficient");
            return res.render('home', {
                response :{
                    withdraw: 'insufficient',
                    customer: {
                        name: sender.name,
                        balance: sender.balance,
                        accountNo: sender.accountNo
                    }
                }
            });
        }
        
        sender.balance = parseInt(sender.balance) - parseInt(req.body.amount);
        receiver.balance = parseInt(receiver.balance) + parseInt(req.body.amount);

        await sender.save();
        await receiver.save();

        let currentCustomer = {
            accountNo: sender.accountNo,
            name: sender.name,
            balance: sender.balance
        }

        return res.render('home', {
            response:{
                show_transaction_update: 'true',
                customer: currentCustomer,
            }
        });
        
    } catch (err) {
        console.log("Error in controller: ",err)
    }
}