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

// Own Objects
    var config = require('./server/config/environment');

// create WebServer
    var app = express();

// MiddleWare
    app.use(express.static('client'));
    app.use(morgan('dev'));

// Listen server
    app.listen(config.port);
    console.log('coco server listen... with port: 5555');
