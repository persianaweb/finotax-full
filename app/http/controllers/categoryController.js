
const CategoryArticle = require('app/models/categoryArticle');

class categoryController {
    constructor() {
        this.storeArticle = this.storeArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.updateProcessArticle = this.updateProcessArticle.bind(this); 
        
    }

    async index(req, res) {
        try {
            const title = 'Categorys';
            let page = req.query.page || 1;
            const categoryArticle = await CategoryArticle.paginate({}, { page, limit: 10, sort: { createAt: 1 }, populate: { path: 'parent' } });
            res.render('admin/category/index', { title, categoryArticle});
        } catch (error) {
            console.log(error)
        }

    }

    async createArticle(req, res) {
        try {
            const title = 'Create Category Article';
            const categorys = await CategoryArticle.find({ parent: null });
            res.render('admin/category/createArticle', { title, categorys });
        } catch (error) {
            console.log(error)
        }
    }

    async editArticle(req, res) {
        try {
            const title = 'Edit Category';
            const category = await CategoryArticle.findById(req.params.id);
            const categorys = await CategoryArticle.find({ parent: null });
            res.render('admin/category/editArticle', { title, category, categorys });
        } catch (error) {
            console.log(error)
        }
    }

    storeArticle(req, res) {
        let { name, parent } = req.body;
        const addCategoryArticle = new CategoryArticle({
            name,
            slug: this.slug(name),
            parent: parent == 'none' ? null : parent
        })
        addCategoryArticle.save();
        return res.redirect('/admin/categorys');
    }

    slug(title) {
        // if (!title) return '';
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-');
    }

    async destroyArticle(req, res) {
        let category = await CategoryArticle.findById(req.params.id).populate('childs').exec();
        if (!category) {
            res.json('چنین دسته بندی در سایت ثبت نشده است')
        }

        // delete episode
        category.childs.forEach(category => category.deleteOne({ _id: category._id }));
        await category.deleteOne({ _id: category._id });

        return res.redirect(req.header('Referer') || '/');
    }

    async updateArticle(req, res, next) {
        try {
            await this.updateProcessArticle(req, res, next);
            return res.redirect('/admin/categorys')
        } catch (err) {
            return next(err);
        }
    }

    async updateProcessArticle(req, res, next) {
        let { name, parent } = req.body;
        await CategoryArticle.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                parent: parent == 'none' ? null : parent,
                slug: this.slug(name)
            }
        }).exec();
    }

}

module.exports = new categoryController();