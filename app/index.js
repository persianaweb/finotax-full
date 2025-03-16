const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// middlleware 
const AccessUserMiddleware = require('app/http/middlleware/userAccess');

const app = express();

module.exports = class App {
    constructor() {
        this.setConfig();
        this.configServer();
        this.configDB();
        this.setRoutes();
    }

    setConfig() {
        app.use(express.static(__dirname + '/public'));
        app.set('view engine', 'ejs');
        app.set("views", path.resolve('./resource/views'));
        app.use(expressLayout);
        app.set('layout', 'master');
        app.set("layout extractScripts", true);
        app.set("layout extractStyles", true);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: 'secretKey',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/finotax' }),
            cookie: { secure: false }
        }));
        app.use(cookieParser('secretKey'));
        app.use(flash());
        app.use(AccessUserMiddleware.accessUser);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }

    configServer() {

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }

    setRoutes() {
        app.use(require('app/routes/web'));
    }

    configDB() {
        mongoose.connect('mongodb://127.0.0.1:27017/finotax', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('DB Connected!'));

    }
}
