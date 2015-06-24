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
models.Quiz.findAll({where: ["lower(pregunta) like lower(?)", '%'+req.query.search+'%'], order: 'pregunta ASC'}).then(
function(quizes) {
res.render('quizes/index.ejs', { quizes:quizes,title:'Tu consulta: '+req.query.search,
	texto:'Resultado de tu consuta para: '+req.query.search,errors:[]})
}).catch(function(error) { next(error);});	
}
else
{
models.Quiz.findAll().then(
function(quizes) {
res.render('quizes/index.ejs', { quizes:quizes,title:'Lista de Preguntas',
	texto:'Listado de preguntas a las que puedes contestar:',errors:[]})
}).catch(function(error) { next(error);});	

}
};

exports.show=function(req,res){
res.render('quizes/show', { pregunta:req.quiz.pregunta,title:req.quiz.respuesta,
	num:req.quiz.id,errors:[]});
};

exports.answer=function(req,res){
var errores=[];
if(req.query.respuesta.length===0){ 
	req.query.respuesta='Escribe algo :(';	
	errores[0]='Escribe algo :(';
	res.render('quizes/show', {pregunta:req.quiz.pregunta,title:req.quiz.respuesta,
		num:req.quiz.id,errors:errores});
	}

if(req.query.respuesta[0].toUpperCase()+req.query.respuesta.slice(1)===req.quiz.respuesta)
{
res.render('quizes/answer', {resultado:' Correcto ',respuesta:req.quiz.respuesta,tipo:'acierto',
	title:'Preguntas',num:req.quiz.id,errors:[]});
}
else
{
res.render('quizes/answer', {resultado:' Incorrecto ',respuesta:req.query.respuesta,tipo:'error',
	title:'Preguntas',num:req.quiz.id,errors:[]}).then(function(){res.redirect('/quizes');});	
}
};
exports.new=function(req,res){
var quiz=models.Quiz.build(
	{ pregunta:"Pregunta",respuesta:"Respuesta",tema:"Tema"}
);
res.render('quizes/new', {quiz:quiz,errors:[]});
};

exports.create=function(req,res){
var quiz=models.Quiz.build(req.body.quiz);

quiz.validate().then(
	function(err){
		if(err)
		{
        res.render('quizes/new', {quiz:quiz,errors:err.errors});	
		}
		else
		{
		quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){res.redirect('/quizes');})	
		}
	});

};

exports.edit=function(req,res){
var quiz=req.quiz;
	
res.render('quizes/edit', {quiz:quiz,errors:[]});
};

exports.update=function(req,res){
req.quiz.pregunta=req.body.quiz.pregunta;
req.quiz.respuesta=req.body.quiz.respuesta;
req.quiz.tema=req.body.quiz.tema;
req.quiz.validate().then(

	function(err){
	if(err){res.render('quizes/edit', {quiz:req.quiz,errors:err.errors});}
    else
    {req.quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){res.redirect('/quizes');})}	
     
	}
	).catch(function(error){next(error)});

};

exports.destroy=function(req,res){

     req.quiz.destroy().then()(function(){res.redirect('/quizes');}

	).catch(function(error){next(error)});
};