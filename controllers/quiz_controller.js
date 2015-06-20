var models=require('../models/models.js');

exports.load=function(req, res, next, quizId){
models.Quiz.findById(quizId).then(
	function(quiz) {
	if(quiz){
	   req.quiz=quiz;
	   next();
	}
    else{next(new Error('No existe la pregunta: '+quizId));}
}
).catch (function(error){next(error);});
};

exports.index=function(req,res){

if(req.query.search)

{
models.Quiz.findAll({where: ["pregunta like ?", '%'+req.query.search+'%'], order: 'pregunta ASC'}).then(
function(quizes) {
res.render('quizes/index.ejs', { quizes:quizes,title:'Tu consulta: '+req.query.search,
	texto:'Resultado de tu consuta para: '+req.query.search})
}).catch(function(error) { next(error);});	
}
else
{
models.Quiz.findAll().then(
function(quizes) {
res.render('quizes/index.ejs', { quizes:quizes,title:'Lista de Preguntas',
	texto:'Listado de preguntas a las que puedes contestar:'})
}).catch(function(error) { next(error);});	

}







};


exports.show=function(req,res){
res.render('quizes/show', { pregunta:req.quiz.pregunta,title:req.quiz.respuesta,num:req.quiz.id});
};

exports.answer=function(req,res){
if(req.query.respuesta===req.quiz.respuesta)
{
res.render('quizes/answer', {resultado:' Correcto ',respuesta:req.quiz.respuesta,tipo:'acierto',title:'Preguntas'});
}
else
{
res.render('quizes/answer', {resultado:' Incorrecto ',respuesta:req.query.respuesta,tipo:'error',title:'Preguntas'});	
}
};