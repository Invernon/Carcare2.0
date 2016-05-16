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

//var connectionString = "postgres://oskolfwwaobjzy:9uX-DoK-dv1gR04zBSgPbyOMlu@ec2-54-235-102-190.compute-1.amazonaws.com:5432/d36baplqi973b2"
var connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;

//var massiveInstance  = massive.connectSync({connectionString : connectionString});
var db;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query("SELECT * FROM usuarios Where usuarios_id = 1 ;");


//fired after last row is emitted

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() { 
  client.end();
});


//-------------------------------------//
var app = express();

var startExpress = function() {
	app.listen(config.express.port);
	db = app.get('db');
}

var initialize 	= function(){
	startExpress();
}

//prueba

app.get('/', function(req,res){

	var correo;
		
		query.on('row', function(row) {
		  console.log(row);
		  	correo = row[0].correo;
			var contra = row[0].contraseña;
		 
		 });
			


		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		//res.send('Estamos Online: \n' + objeto);
		res.send('Almenos ya conecta, deberia decir 1 , pero dice: \n Usuario:' + correo);
		

		query.on('end', function() { 
		  client.end();
		});


		
});
//para local
//app.listen(8888) ; console.log("API esta en 8888");

console.log("Si corre");
//pureba end


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
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8888;

app.listen(port, function() {
    console.log('listen on: ' + port);
});