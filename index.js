const express = require('express');
const dd = require('./config/mongoose');
const app = express();
const port = 8000;


app.use(express.static('./assets'));
app.use(express.urlencoded());
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
})
