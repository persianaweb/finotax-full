const { body } = require('express-validator');

class registerValidator {
    handle() {
        return [
            body('mobileNumber')
                .isNumeric()
                .withMessage('لطفا عدد وارد کنید')
                .isLength({ min: 10 })
                .withMessage('شماره موبایل وارد شده معتبر نمی باشد')
        ]
    }
}

module.exports = new registerValidator();