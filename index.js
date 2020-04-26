const express = require('express');
const dd = require('./config/mongoose');
const app = express();
const port = 8000;

app.use(express.static('./assets'));
app.use(express.urlencoded());
app.set('views', './views');
app.set('view engine', 'ejs');

const controller = require('./controllers/controller');

app.get('/', controller.home);
app.get('/signup', controller.signup);
app.post('/create-customer', controller.create);
app.post('/enquiry', controller.enquiry);
app.post('/deposit', controller.deposit);
app.post('/withdraw', controller.withdraw);
app.post('/transaction', controller.transaction);

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
})
