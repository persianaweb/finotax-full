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
const userController = require('app/http/controllers/userController');
const categoryController = require('app/http/controllers/categoryController');
const keywordsController = require('app/http/controllers/keywordsController'); 
const articleController = require('app/http/controllers/articleController');
const QuestionController = require('app/http/controllers/admin/QuestionController');
const QuestionControllerForSingleModules = require('app/http/controllers/admin/QuestionControllerSingleModules');
const modulesController = require('app/http/controllers/admin/moduleController');
const SubscriptionController = require('app/http/controllers/SubscriptionController');
const videoformodules = require('app/http/controllers/VideoModulesController');
const videoforCategory = require('app/http/controllers/VideoCategoryController');

//AdminRoutes
router.get('/', adminController.index);

//User Routes
router.get('/users', userController.usersView);
//Add User Roles
router.get('/users/:id/userRoles', userController.userRoles);
router.post('/users/:id/addUserRoles', userController.addUserRoles);
//Set Admin User
router.get('/users/:id/adminAccess', userController.adminAccess);
//Save User
router.get('/users/create', userController.SaveUsersView);
router.post('/users/create/add', upload.single('image'), fileToField.handle, userController.store);
//Delete User
router.post('/users/:id', userController.destroy);
//Edit User
router.get('/users/:id/edit', userController.updateAllUsers);
router.post('/users/edit/:id', upload.single('image'), fileToField.handle, userController.updateProcessId);

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

//keywords Routes
router.get('/keywords', keywordsController.index);
//Create keywords
router.get('/keywords/create', keywordsController.create);
router.post('/keywords/create', keywordsController.store);
//Delete keywords

router.post('/keywords/:id/article', keywordsController.destroy);
//Edit keywords
router.get('/keywords/:id/edit', keywordsController.edit);
router.post('/keywords/edit/:id', keywordsController.update);

//Articles Routes
router.get('/articles', articleController.index);
router.get('/articles/create', articleController.create);
router.post('/articles/create', upload.single('image'), fileToField.handle, articleController.store);
// router.post('/articles/create', upload.single('image'), fileToField.handle, articleValidator.handle(), articleController.store);

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

//Video Modules
router.get('/uploadVideo-Modules', videoformodules.createVideo);
router.post('/upload-video-Modules',  uploadVideo.single('video'), videoformodules.uploadVideo);
router.post('/videos-Modules/:id/delete', videoformodules.deleteVideo);

//Video categorys
router.get('/uploadVideo-categorys', videoforCategory.createVideo);
router.post('/upload-video-categorys',  uploadVideo.single('video'), videoforCategory.uploadVideo);
router.post('/videos-categorys/:id/delete', videoforCategory.deleteVideo);

//question Routes for all modules Routes  
router.get('/question', QuestionController.index);
router.get('/question/create', QuestionController.create);
router.post('/question/create', QuestionController.store);
//Delete question
router.post('/question/:id', QuestionController.destroy);
//Edit question
router.get('/question/:id/edit', QuestionController.edit);
router.post('/question/edit/:id', QuestionController.update);

//question Routes for single modules Routes  
router.get('/question-modules/create', QuestionControllerForSingleModules.create);
router.post('/question-modules/create', QuestionControllerForSingleModules.store);
//Delete question
router.post('/question-modules/:id', QuestionControllerForSingleModules.destroy);
//Edit question
router.get('/question-modules/:id/edit', QuestionControllerForSingleModules.edit);
router.post('/question-modules/edit/:id', QuestionControllerForSingleModules.update);

//modules Routes
router.get('/modules/create', modulesController.create);
router.post('/modules/create', modulesController.store); 
//Edit modules
router.get('/modules/:id/edit', modulesController.edit);
router.post('/modules/edit/:id', modulesController.update);
//Delete question
router.post('/modules/:id', modulesController.destroy);

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