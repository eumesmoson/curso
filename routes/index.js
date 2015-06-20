var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Preguntas' });

});

router.get('/autor', function(req, res, next) {
res.render('autor', { title: ' Yo ' });

});

router.param('quizId',quizController.load);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
