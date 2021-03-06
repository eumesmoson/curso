var path=require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);


var quiz_path= path.join(__dirname,'quiz');
var Quiz= sequelize.import(quiz_path);

var comment_path=path.join(__dirname,'comment');
var Comment=sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Comment.belongsTo(Quiz);//relacion n-1
//Quiz.hasMany(Comment);//relacion 1-n
exports.Quiz= Quiz; //para ter acceso no resto do sitio
exports.Comment= Comment;
//exports.sequelize = sequelize;//para querys
Quiz.hasMany(Comment, {
'constraints': true,
'onUpdate': 'cascade',
'onDelete': 'cascade',
'hooks': true
}); 
//sequelize.sync() crea e inicializa taboa en bd 
sequelize.sync().then(function(){

	Quiz.count().then(function(count){
	if(count===0){
		Quiz.create({
		pregunta:'Capital de Italia',respuesta:'Roma',tema:'humanidades'
	});
        Quiz.create({
		pregunta:'Capital de Portugal',respuesta:'Lisboa',tema:'humanidades'
	});
        Quiz.create({
		pregunta:'Capital de Francia',respuesta:'Paris',tema:'humanidades'
	});
        Quiz.create({
		pregunta:'Capital de Alemania',respuesta:'Berlin',tema:'humanidades'
	});
    Quiz.create({
		pregunta:'Capital de Inglaterra',respuesta:'Londres',tema:'humanidades'
	});
	Quiz.create({
		pregunta:'Capital de España',respuesta:'Madrid',tema:'humanidades'
	});
	Quiz.create({
		pregunta:'Capital de Rusia',respuesta:'Moscu',tema:'humanidades'
	});
};
}).then(function(){console.log('BASE DE DATOS INCICIALIZADA :) ')});
});
