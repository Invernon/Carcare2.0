// Importando las Configuraciones < CORE MODULES >
var config 			= require('./config.json');
var express 		= require('express');
var serveStatic 	= require('serve-static');
var pg 				= require('pg');
//var bodyParser  	= require('body-parser');
//var multer 			= require('multer');
//var massive 		= require('massive');


pg.defaults.ssl = true;
//Conexion a la base de datos:

var connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;
//var massiveInstance  = massive.connectSync({connectionString : connectionString});
var db;

//-------------------------------------//
var app = express();

var startExpress = function() {
	app.listen(config.express.port);
	db = app.get('db');
}

var initialize 	= function(){
	startExpress();
}

console.log("Si corre");
/*
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8888;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.listen(port, function() {
    console.log('listen on: ' + port);
});

//---------------------------------------------//
*/

// Send back a 500 error
var handleError = function(res) {
    return function(err){
        console.log(err)
        res.send(500,{error: err.message});
    }
}

//------------------------------------------//

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  /*client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });*/
});


