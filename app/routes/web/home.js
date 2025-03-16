const express = require('express');
const router = express.Router();


//Controllers
const homeController = require('app/http/controllers/homeControllers');
const profileController = require('app/http/controllers/profileController');
const QuestionController = require('app/http/controllers/admin/QuestionController');
const SubscriptionController = require('app/http/controllers/SubscriptionController');

//middlleware
const userRedirect = require('app/http/middlleware/UserRedirect');


//homeRoutes
router.get('/', homeController.index);
router.get('/learning', homeController.learnPage);

//Single articlePage
router.get('/article/:slug', homeController.articlePage); 
router.post('/article/save-quiz-result', QuestionController.saveQuizResult); 

//User Profile
router.get('/user-profile', profileController.index);
//profile tickets
router.get('/mytickets', userRedirect.handle, profileController.tickets);
router.get('/mytickets-send', profileController.sendForm);
router.get('/mytickets-view/:id', profileController.viewTickets);
router.post('/mytickets-send', profileController.sendTicket);
router.post('/replay-send', profileController.sendTicketReply);

//acc1
router.get('/acc1', homeController.acc1);
router.get('/acc1test', homeController.acctest1);

//acc2
router.get('/acc2', homeController.acc2);
// router.get('/acc1test', homeController.acctest1);

//acc3
router.get('/acc3', homeController.acc3);
// router.get('/acc1test', homeController.acctest1);

//tax1
router.get('/tax1', homeController.tax1);
// router.get('/acc1test', homeController.acctest1);

//tax2
router.get('/tax2', homeController.tax2);
// router.get('/acc1test', homeController.acctest1);

//tax3
router.get('/tax3', homeController.tax3);
// router.get('/acc1test', homeController.acctest1);

//fin
router.get('/fin1', homeController.fin1);
// router.get('/acc1test', homeController.acctest1);

router.get('/fin2', homeController.fin2);
// router.get('/acc1test', homeController.acctest1);

router.get('/fin3', homeController.fin3);
// router.get('/acc1test', homeController.acctest1);

// subscribes
router.get('/user/subscribe', SubscriptionController.subscribe);
router.get('/user/subscriptionStatus', SubscriptionController.subscriptionStatus);
router.post('/user/subscribe', SubscriptionController.subscribeSale);

 



module.exports = router;