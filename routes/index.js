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

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
