const middleware = require('./middleware');

class fileToField extends middleware {
    handle(req, res, next) {
        if (!req.file) {
            req.body.image = undefined;
        } else {
            req.body.image = req.file.originalname;
        }

        if (!req.files || !req.files.gallery) {
            req.body.gallery = undefined;
        } else {
            // Assuming you want to store the gallery images as an array of filenames
            req.body.gallery = req.files.gallery.map(file => file.originalname);
        }
        next();
    }
}
module.exports = new fileToField();