// NodeBuildin Objects
    var path          = require('path');

// Node_modules Objects
    var express       = require('express');
    var morgan        = require('morgan');
    var bodyParser    = require('body-parser');
    var cookieParser  = require('cookie-parser');
    var favicon       = require('serve-favicon');
    var mongoose      = require('mongoose');
    var autoIncrement = require('mongoose-auto-increment');
    var session       = require('express-session');
    var multer        = require('multer');

// Own Objects
    var config       = require('./config/environment');
    var items        = require('./api/items');
    var comments = require('./api/comments');
    var areas         = require('./api/areas');
    var users        = require('./api/users');
    var upload       = require('./api/upload');

// create WebServer
var app = express();

// connect MongoDB
var connect = mongoose.connect(config.mongo.uri);

autoIncrement.initialize(connect);

// create DBModule
var db = connect.connection;
db.on('error', console.error.bind(console, 'DB Connection Error!!'));

db.once('open', function(callback) {
    console.log('MongoDB Connectioned!!');
});

// MiddleWare
    app.use(multer({dest:'./uploads/'}).single('file'));
    app.use(express.static('client'));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

// Routes
    app.use('/api/items', items);
    app.use('/api/areas', areas);
    app.use('/api/users', users);
    app.use('/api/comments', comments);

    app.use('/api/upload', upload);

// Listen server
    app.listen(config.port);
    console.log('coco server listen... with port: 5555');

// make Object
    module.exports = app;
