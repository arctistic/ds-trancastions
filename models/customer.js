const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        require: true,
        unique: true,
    },
    passcode: {
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: String,
        required: true
    }
},{
    timestamps: true
});
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;