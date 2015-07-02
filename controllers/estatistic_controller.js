var models=require('../models/models.js');

var datos=[];
var mens='';
function vedatos()
{
	models.Quiz.count().then(function(count){datos.push(count);});
	models.Comment.count().then(function(count){datos.push(count)});
	models.Comment.count({where: {publicado:true}}).then(function(count){datos.push(count);});
    models.Comment.count({where: {publicado:false}}).then(function(count){datos.push(count);});
    //models.sequelize.query('SELECT count(*) AS n FROM "Quizzes" WHERE "id" IN (SELECT DISTINCT "QuizId" FROM "Comments")')
   // .then(function(count){datos.push(count);});
}
exports.datos=function(req,res){

	
	vedatos();
	//vedatos();
 
	console.log('*****Array:'+datos.length+'----0----'+datos[0]+'----1---'+datos[1]+'*****')
    res.render('quizes/estadisticas', 
    {title:'Estadísticas',
	numpre:datos[0],
	numcom:datos[1],
	media:(parseFloat(datos[1])/parseFloat(datos[0])).toFixed(2),
	publi:parseInt(datos[2]),
	nopubli:parseInt(datos[3]),
	precomen:parseInt(datos[4]),
	mensaje:mens});	

//res.redirect('/quizes');

};
