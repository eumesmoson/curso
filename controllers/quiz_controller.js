var models=require('../models/models.js');

exports.question=function(req,res){
models.Quiz.find(req.params.quizId).then(function(quiz){
res.render('quizes/question', { pregunta:quiz.pregunta,title:'Preguntas'})
})
};
exports.answer=function(req,res){
models.Quiz.find(req.params.quizId).then(function(quiz){
if(req.query.respuesta===quiz.respuesta)
{
res.render('quizes/answer', {resultado:' Correcto ',respuesta:req.query.respuesta,tipo:'acierto',title:'Preguntas'});
}
else
{
res.render('quizes/answer', {resultado:' Incorrecto ',respuesta:req.query.respuesta,tipo:'error',title:'Preguntas'});	
}
})
};