// const Product = require('app/models/products');
// const Article = require('app/models/articles');
// const Comments = require('app/models/comment');

class adminController {
    async index(req, res) {
        try {
            const title = 'index Page';
            // const totalProducts = await Product.countDocuments();
            // const totalArticles = await Article.countDocuments();
            // const totalComments = await Comments.countDocuments();
            res.render('admin/index', { title });
        } catch (error) {
            console.log(error);
        }

    }

    // uploadImage(req, res) {
    //     let image = req.file;
    //     res.json({
    //         'uploaded': 1,
    //         'fileName': image.originalname,
    //         'url': `${image.destination}/${image.filename}`.substring(10)
    //     })
    // }
}

module.exports = new adminController();