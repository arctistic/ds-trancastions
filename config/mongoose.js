// require library
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/ds_transactions_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to DB'));

db.once('open', function(){
    console.log("Succefully connected to the database");
});

