const User = require('app/models/users');
const Role = require('app/models/role');
const autoBind = require('auto-bind');
const fs = require('fs');

class userController {

    constructor() {
        autoBind(this);
    }

    async updateUser(req, res, next) {
        try {
            const user = await User.findById(req.session.userId);
            const title = 'Update User';
            res.render('admin/user/updateUser', { title, user, Smassages: req.flash('messages') });
        } catch (error) {
            console.log(error)
        }
    }

    async usersView(req, res) {
        try {
            const title = 'All Users';
            let page = req.query.page || 1;
            const users = await User.paginate({}, { page, limit: 10, sort: { createAt: 1 }, populate: { path: 'roles' } });
            res.render('admin/user/allUsers', { title, users });
        } catch (error) {
            console.log(error)
        }
    }

    async userRoles(req, res) {
        try {
            const title = 'User role';
            const user = await User.findById(req.params.id);
            const roles = await Role.find({});
            res.render('admin/user/userRole', { user, roles, title });
        } catch (error) {
            console.log(error)
        }
    }

    SaveUsersView(req, res) {
        try {
            const title = 'Add User';
            res.render('admin/user/addUser', { title });
        } catch (error) {
            console.log(error)
        }
    }

    async updateAllUsers(req, res) {
        try {
            const title = 'Edit User';
            const user = await User.findById(req.params.id);
            res.render('admin/user/updateUserId', { user, title });
        } catch (error) {
            console.log(error)
        }
    }

    async addUserRoles(req, res) {
        await User.updateOne({ '_id': req.params.id }, { $set: { roles: req.body.roles } });
        return res.redirect('/admin/users');
    }

    async adminAccess(req, res) {
        const user = await User.findById(req.params.id);
        await User.updateOne({ '_id': req.params.id }, { $set: { admin: !user.admin } });
        return res.redirect('/admin/users');
    }

    async store(req, res) {
        //RandomCode
        const min = 1000;
        const max = 9999;
        let randomeCode = Math.floor(Math.random() * (max - min + 1)) + min;

        let image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
        let { name, mobileNumber, email } = req.body;
        const addUser = await new User({
            name, mobileNumber, email,
            image, randomeCode
        })
        addUser.save();
        return res.redirect('/admin/users');
    }

    async destroy(req, res) {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.json('چنین کاربری در سایت ثبت نام نکرده است')
        }

        await user.deleteOne({ _id: user._id });

        return res.redirect('/admin/users');
    }

    async updateProcess(req, res, next) {
        try {
            const user = await User.findById(req.session.userId);

            if (!user) {
                return res.status(404).send('کاربری یافت نشد');
            }
            const updateFields = { ...req.body };
            if (req.file) {
                if (user.image) {
                    const imagePath = `app/public/${user.image}`;
                    const existsSync = fs.existsSync(imagePath);
                    // چک کردن وجود تصویر در دایرکتوری
                    if (existsSync) {
                        // اگر تصویر وجود داشته باشد، حذف کنید
                        fs.unlinkSync(imagePath);
                    }
                }
                updateFields.image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
            }
            await User.findByIdAndUpdate(req.session.userId, { $set: updateFields });

            req.flash('messages', 'ویرایش پروفایل با موفقیت انجام شد');
            return res.redirect(req.header('Referer') || '/');
        } catch (err) {
            return next(err);
        }
    }

    async updateProcessId(req, res, next) { 
        try {
            const users = await User.findById(req.params.id);
            if (!users) {
                return res.status(404).send('کاربری یافت نشد');
            }

            let updateFields = { ...req.body };

            if (req.file) {
                const mainImagePath = `app/public/${users.image}`;

                // بررسی وجود تصویر و حذف آن
                if (users.image && fs.existsSync(mainImagePath)) {
                    try {
                        fs.unlinkSync(mainImagePath);
                    } catch (err) {
                        console.error("Error deleting file:", err);
                    }
                }

                updateFields.image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
            }

            await User.findByIdAndUpdate(req.params.id, { $set: updateFields });

            return res.redirect('/admin/users');
        } catch (err) {
            return next(err);
        }
    }


    getDirImage(dir) {
        return dir.substring(10)
    }

}

module.exports = new userController();