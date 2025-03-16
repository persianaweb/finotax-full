const multer = require('multer');
const fs = require('fs');
const { mkdirp } = require('mkdirp');

const getDir = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    return `app/public/uploads/images/${year}/${month}/${day}`
}

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getDir();
        mkdirp(dir).then(made =>
            cb(null, dir)
        )

    },
    filename: (req, file, cb) => {
        let filePath = getDir() + '/' + file.originalname;
        if (!fs.existsSync(filePath)) {
            cb(null, file.originalname)
        } else {
            let newName = Date.now() + '-' + file.originalname;
            cb(null, newName)
        }

    }
})

const uploadImage = multer({
    storage: storageImage,
    limits:{
        fileSize:1024*1024*10 //100mgbyte
    }
})

module.exports = uploadImage;