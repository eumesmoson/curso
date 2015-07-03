var models=require('../models/models.js');

var datos={
    numpre:0,
	numcom:0,
	media:0,
	publi:0,
	nopubli:0,
	precomen:0,
	presincomen:0,
	humanidades:0,
    ocio:0,
    ciencia:0,
    tecnologia:0,
    otro:0,


}
var mens='';

exports.datos=function(req,res){

	//vedatos()
   models.Quiz.count()
  .then(function(count) {
       datos.numpre= count;
       var promise =models.Quiz.findAndCountAll({
       include: [{model: models.Comment,required: true, } ],
       distinct: true
   });
        return promise;
   }).then(function(count) {
        datos.precomen= count.count;
        datos.presincomen= datos.numpre - count.count;
        return models.Comment.count();
    }).then(function(count) {
        datos.numcom = count;
        datos.media=(datos.numcom/datos.numpre).toFixed(2);
      
    }).then(function(){
models.Comment.count({where: {publicado:true}}).then(function(count){datos.publi=count;});
models.Comment.count({where: {publicado:false}}).then(function(count){datos.nopubli=count;});
models.Quiz.count({where: {tema :'humanidades'}}).then(function(count){datos.humanidades=count;});
models.Quiz.count({where: {tema :'ocio'}}).then(function(count){datos.ocio=count;});
models.Quiz.count({where: {tema :'ciencia'}}).then(function(count){datos.ciencia=count;});
models.Quiz.count({where: {tema :'tecnologia'}}).then(function(count){datos.tecnologia=count;});
models.Quiz.count({where: {tema :'otro'}}).then(function(count){datos.otro=count;});}
    ).catch(function(error) {
        console.error(error);
    }).finally(function(error) {
        next();    });
	
    res.render('quizes/estadisticas', 
    {title:'Estadísticas',estadisticas:datos,mensaje:mens});	

//res.redirect('/quizes');

};
