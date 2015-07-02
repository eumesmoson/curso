
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/login', {errors:errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            errors = [{"message": 'Se ha producido un error-> '+error}];
            //res.redirect("/login");     
            res.render('sessions/login', {errors:errors});
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username};
        console.log('usuario:'+user.username+' logeado correctamente :)');
        res.redirect(req.session.redir);// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir); // redirect a path anterior a login
};
// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
