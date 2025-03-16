const multer = require('multer');
const fs = require('fs');
const { mkdirp } = require('mkdirp');

// مسیر دایرکتوری بر اساس تاریخ
const getVideoDir = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1; // چون getMonth() از 0 شروع می‌شود، +1 اضافه می‌کنیم.
    let day = new Date().getDate();

    return `app/public/uploads/videos/${year}/${month}/${day}`;
}

// تنظیمات Multer برای ذخیره ویدیوها
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getVideoDir();
        mkdirp(dir).then(() => cb(null, dir));
    },
    filename: (req, file, cb) => {
        let filePath = getVideoDir() + '/' + file.originalname;
        if (!fs.existsSync(filePath)) {
            cb(null, file.originalname);
        } else {
            let newName = Date.now() + '-' + file.originalname;
            cb(null, newName);
        }
    }
});

// محدودیت حجم (مثلاً 100MB) و نوع فایل‌ها
const uploadVideo = multer({
    storage: storageVideo,
    limits: {
        fileSize: 1024 * 1024 * 100 // 100MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm', 'video/avi', 'video/mov'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('فرمت ویدیویی معتبر نیست! فقط MP4, MKV, WEBM, AVI, MOV مجاز است.'));
        }
    }
});

module.exports = uploadVideo;
