var models=require('../models/models.js');

var datos=[];
var mens='';
exports.datos=function(req,res){

	
	var a=models.Quiz.count().then(function(count){
	
		if(count===0){
        
        datos.push(count);
        mens='No hay datos :(';
	}
	else{datos.push(count);mens='';}
     
     });
	var b=models.Comment.count().then(function(count){datos.push(count)});
	var c=models.Comment.count({where: {publicado:true}}).then(function(count){datos.push(count);});
    var d=models.Comment.count({where: {publicado:false}}).then(function(count){datos.push(count);});
    var x=(parseFloat(datos[1])/parseFloat(datos[0])).toFixed(2);
    var y=parseInt(datos[2]);
    var z=parseInt(datos[3]);
	console.log('*****Array:'+datos.length+'----0----'+datos[0]+'----1---'+datos[1]+'*****')
    res.render('quizes/estadisticas', {title:'Estadísticas',
	numpre:datos[0],numcom:datos[1],media:x,publi:y,nopubli:z,mensaje:mens});	
    
//res.redirect('/quizes');

};
