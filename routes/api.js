'use strict';

const express = require('express');

const router = express.Router();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { verifyLogin } = require('../middleware');

// middleware
router.use(verifyLogin);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootadmin',
    database: 'appdb'
};

const sessionStore = new MySQLStore(options);

router.use(session({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

router.get('/', async (req, res) => {
    console.log('/ route is being called');
    res.send({ success: true, message: 'API Is being called successfully' });
});

module.exports = router;
