var models=require('../models/models.js');

var datos=[];
var mens='';
exports.datos=function(req,res){

	
	models.Quiz.count().then(function(count){
	
		if(count===0){
        
        datos.push(count);
        mens='No hay datos :(';
	}
	else{datos.push(count);mens='adfsddfsd';}
     
     });
	models.Comment.count().then(function(count){

    datos.push(count);});
  

	console.log('*****Array:'+datos.length+'----0----'+datos[0]+'----1---'+datos[1]+'*****')
     res.render('quizes/estadisticas', {title:'Estadísticas',
		numpre:datos[0],numcom:datos[1],mensaje:mens});	
    
//res.redirect('/quizes');

};
