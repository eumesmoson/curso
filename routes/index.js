var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var estatisticController = require('../controllers/estatistic_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Preguntas',errors:[] });
});

router.param('quizId',quizController.load);
router.param('commentId',commentController.load);

//Rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/autor', function(req, res, next) {
res.render('autor', { title: ' Yo ' });
});
router.get('/creditos', function(req, res, next) {
res.render('creditos', { title: 'Recursos Usados' });
});

router.get('/quizes', quizController.index);
router.get('/quizes/tema/:tema[a-z]', quizController.temas);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/tema/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',     sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',  sessionController.loginRequired, quizController.destroy);
//router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
sessionController.loginRequired, commentController.publish);
router.get('/estatistics', estatisticController.datos);



module.exports = router;
