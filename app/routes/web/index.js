const express = require('express');
const router = express.Router();
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const adminRoutes = require('./admin');

// middlleware 
const adminRedirect = require('app/http/middlleware/adminRedirect');
const checkError = require('app/http/middlleware/checkError');
// Home Routes
router.use('/', homeRoutes);

//Login routes
router.use('/auth', authRoutes);

//admin Routes
router.use('/admin', adminRedirect.handle , adminRoutes);

// Error Routes
router.all('*', checkError.get404); 
router.use(checkError.handle);

module.exports = router;