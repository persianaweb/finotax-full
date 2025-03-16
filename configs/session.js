
const MongoStore = require('connect-mongo');

module.exports = {
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/finotax' }),
    cookie: { secure: false }
}