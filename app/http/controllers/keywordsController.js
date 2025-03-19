
const Keyword = require('app/models/keywords');
 
class keywordsController {
    constructor() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.updateProcess = this.updateProcess.bind(this); 

    }
    async keywordsPage(req, res) {
        try {
            // let page = req.query.page || 1;
            const keywords = await Keyword.find();
            // const keywords = await Keyword.paginate({}, { page, limit: 10, sort: { createAt: 1 } });
            res.render('keywords', { keywords });
        } catch (error) { 
            console.log(error)
        }

    }

    async index(req, res) {
        try {
            const title = 'Keywords';
            let page = req.query.page || 1;
            const keywords = await Keyword.paginate({}, { page, limit: 10, sort: { createAt: 1 } });
            res.render('admin/keywords/index', { title, keywords });
        } catch (error) {
            console.log(error)
        }

    }

    async create(req, res) {
        try {
            const title = 'Create Keywords ';
            const keywords = await Keyword.find();
            res.render('admin/keywords/create', { title, keywords });
        } catch (error) {
            console.log(error)
        }
    }

    async edit(req, res) {
        try {
            const title = 'Edit Keywords';
            const keywords = await Keyword.findById(req.params.id);
            res.render('admin/keywords/edit', { title, keywords });
        } catch (error) {
            console.log(error)
        }
    }


    store(req, res) {
        let { name, meaning } = req.body;
        const addKeywords = new Keyword({
            name,
            slug: this.slug(name),
            meaning
        })
        addKeywords.save();
        return res.redirect('/admin/keywords');
    }

    slug(title) {
        // if (!title) return '';
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-');
    }

    async destroy(req, res) {
        let keywords = await Keyword.findById(req.params.id).exec();
        if (!keywords) {
            res.json('چنین دسته بندی در سایت ثبت نشده است')
        }

        // delete episode
        // category.childs.forEach(category => category.deleteOne({ _id: category._id }));
        await Keyword.deleteOne({ _id: keywords._id });

        return res.redirect(req.header('Referer') || '/');
    }

    async update(req, res, next) {
        try {
            await this.updateProcess(req, res, next);
            return res.redirect('/admin/keywords')
        } catch (err) {
            return next(err);
        }
    }

    async updateProcess(req, res, next) {
        let { name, meaning } = req.body;
        await Keyword.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                meaning,
                slug: this.slug(name)
            }
        }).exec();
    }

}

module.exports = new keywordsController();