const express = require('express');
const multerVideo = require('multer');
const path = require('path');
const router = express.Router();

const upload = require('app/uploadImages');
const uploadVideo = require('app/uploadVideos');

//Middleware
router.use((req, res, next) => {
    res.locals.layout = "admin/master";
    next();
});
const { authenticateUser } = require('./../../http/middlleware/auth');

const fileToField = require('app/http/middlleware/fileToField');
const adminTicketController = require('./../../http/controllers/tickets/adminTicketController');

//Validators
const articleValidator = require('app/http/validators/articleValidator');

//Controllers
const adminController = require('app/http/controllers/admin/adminController');
const categoryController = require('app/http/controllers/categoryController');
const articleController = require('app/http/controllers/articleController');
const QuestionController = require('app/http/controllers/admin/QuestionController');
const SubscriptionController = require('app/http/controllers/SubscriptionController');
//AdminRoutes
router.get('/', adminController.index);

//Categorys Routes
router.get('/categorys', categoryController.index);
//Create Category
router.get('/categorys/createArticle', categoryController.createArticle);
router.post('/categorys/createArticle', categoryController.storeArticle);
//Delete Category

router.post('/categorys/:id/article', categoryController.destroyArticle);
//Edit Category
router.get('/categorys/:id/editArticle', categoryController.editArticle);
router.post('/categorys/editArticle/:id', categoryController.updateArticle);

//Articles Routes
router.get('/articles', articleController.index);
router.get('/articles/create', articleController.create);
router.post('/articles/create', upload.single('image'), fileToField.handle, articleValidator.handle(), articleController.store);
//Delete Article
router.post('/articles/:id', articleController.destroy);
//Edit Article
router.get('/articles/:id/edit', articleController.edit);
router.post('/articles/edit/:id', upload.single('image'), fileToField.handle, articleController.update);
//Video Article
router.get('/videos', articleController.videos);
router.get('/uploadVideo', articleController.createVideo);
router.post('/upload-video',  uploadVideo.single('video'), articleController.uploadVideo);
router.post('/videos/:id/delete', articleController.deleteVideo);

//question Routes for modules
router.get('/question', QuestionController.index);
router.get('/question/create', QuestionController.create);
router.post('/question/create', QuestionController.store);
//Delete question
router.post('/question/:id', QuestionController.destroy);
//Edit question
router.get('/question/:id/edit', QuestionController.edit);
router.post('/question/edit/:id', QuestionController.update);

//tickets
router.get('/tickets', adminTicketController.index);
router.get('/tickets/closed/:id', adminTicketController.update);
router.get('/tickets/replay/:id', adminTicketController.replay);
router.post('/tickets/replay/send', adminTicketController.sendTicket);

//Categorys Routes
router.get('/subscription', SubscriptionController.index);
//Create Category
router.get('/subscription/create', SubscriptionController.create);
router.post('/subscription/create', SubscriptionController.store);
//Delete Category
router.post('/subscription/:id/subscription', SubscriptionController.destroy);
//Edit Category
router.get('/subscription/:id/edit', SubscriptionController.edit);
router.post('/subscription/edit/:id', SubscriptionController.update);


module.exports = router;