const express = require('express');
const router = express.Router();

//Controllers
const authController = require('app/http/controllers/auth/authController');

//Validators
const registerValidator = require('app/http/validators/registerValidator');

//Register
router.get('/', authController.index);
router.post('/register',registerValidator.handle(),  authController.processRegisteration);

//LoginVerify
router.post('/login',  authController.loginVerify);

//logOut
router.get('/logout',  authController.logOut);

module.exports = router;