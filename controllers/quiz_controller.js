exports.question=function(req,res){
res.render('quizes/question', {pregunta:'Capital de Italia',title:'Preguntas'});
}
exports.answer=function(req,res){
if(req.query.respuesta==='Roma')
{
res.render('quizes/answer', {resultado:' Correcto ',respuesta:req.query.respuesta,tipo:'acierto',title:'Preguntas'});
}
else
{
res.render('quizes/answer', {resultado:' Incorrecto ',respuesta:req.query.respuesta,tipo:'error',title:'Preguntas'});	
}

}