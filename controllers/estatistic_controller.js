var models=require('../models/models.js');

var datos={
    numpre:0,
	numcom:0,
	media:0,
	publi:0,
	nopubli:0,
	precomen:0,
	humanidades:0,
    ocio:0,
    ciencia:0,
    tecnologia:0,
    otro:0,


}
var mens='';
function vedatos()
{
models.Quiz.count().then(function(count){datos.numpre=count;});
models.Comment.count().then(function(count){datos.numcom=count;});
models.Comment.count({where: {publicado:true}}).then(function(count){datos.publi=count;});
models.Comment.count({where: {publicado:false}}).then(function(count){datos.nopubli=count;});
//models.sequelize.query('SELECT count(*) AS n FROM "Quizzes" WHERE "id" IN (SELECT DISTINCT "QuizId" FROM "Comments")')
// .then(function(count){datos.push(count);});
models.Comment.count({where: {publicado:false}}).then(function(count){datos.push(count);});
models.Quiz.count({where: {tema :'humanidades'}}).then(function(count){datos.humanidades=count;});
models.Quiz.count({where: {tema :'ocio'}}).then(function(count){datos.ocio=count;});
models.Quiz.count({where: {tema :'ciencia'}}).then(function(count){datos.ciencia=count;});
models.Quiz.count({where: {tema :'tecnologia'}}).then(function(count){datos.tecnologia=count;});
models.Quiz.count({where: {tema :'otro'}}).then(function(count){datos.otro=count;});
}
exports.datos=function(req,res){

	
	vedatos();
	vedatos();
 
	console.log('*****Array:'+datos.length+'----0----'+datos[0]+'----1---'+datos[1]+'*****')
    res.render('quizes/estadisticas', 
    {title:'Estadísticas',estadisticas:datos,mensaje:mens});	

//res.redirect('/quizes');

};
