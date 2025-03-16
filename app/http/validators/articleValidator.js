const { body } = require('express-validator');
const path = require('path');

class articleValidator {
    handle() {
        return [
            body('title')
                .isLength({ min: 5 })
                .withMessage('عنوان مطلب نباید کمتر از 5 کاراکتر باشد'),

            body('editor1')
                .not().isEmpty()
                .withMessage('متن مطلب نباید خالی بماند'),

            body('image')
                .custom(async (value, { req }) => { 

                    if (req.query._method === 'PUT' && value === undefined) return;
                    if (!value) {
                        throw new Error('تصویر مطلب را وارد کنید')
                    } else {
                        const fileExe = ['.png', '.jpg', '.jepg', '.svg', '.webp']
                        if (!fileExe.includes(path.extname(value))) {
                            throw new Error('فایل انتخابی تصویر نمی باشد')
                        }
                    }
                })
        ]
    }
}

module.exports = new articleValidator();