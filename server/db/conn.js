var mongoose = require('mongoose');

var mongoDB = 'mongodb://0.0.0.0:27017/clinic'
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection: ' + 'Error'));
db.once('open', console.log.bind(console, 'MongoDB connection: ' + 'Successfull' ));

module.exports = db;
