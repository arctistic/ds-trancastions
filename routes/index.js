const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/signup', controller.signup);
router.post('/create-customer', controller.create);
router.post('/enquiry', controller.enquiry);
router.post('/deposit', controller.deposit);
router.post('/transaction', controller.transaction);


console.log("Router loaded");
module.exports = router;