// Importando las Configuraciones < CORE MODULES > dependencias
var config 			= require('./config.json');
var express 		= require('express');
var serveStatic 	= require('serve-static');
var pg 				= require('pg');
var pgp				= require('pg-promise')(/*options*/);
var bodyParser  	= require('body-parser');
var cors        = require('cors');

//INICIALIZACION


//BASE DE DATOS
//var conString = "postgres://oskolfwwaobjzy:9uX-DoK-dv1gR04zBSgPbyOMlu@ec2-54-235-102-190.compute-1.amazonaws.com:5432/d36baplqi973b2" ;

var conString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;
pg.defaults.ssl = true;
var client = new pg.Client(conString);

//var db = pgp("postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db);

//Express
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes & Routers ----------------------

/*EN DESARROLLO*/
//app.use('/',require('./routes/index'));
//app.use('/usuarios', require('./routes/usuarios'));
//app.use('/vehiculos', require('./routes/vehiculos'));

/*LISTOS*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require('./routes/api'));
app.use('/marca', require('./routes/marca'));
app.use('/modelo', require('./routes/modelo'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/vehiculos', require('./routes/vehiculos'));
app.use('/estado', require('./routes/estado'));
app.use('/simbolos', require('./routes/simbolos'));




//EJEMPLOS DE CONEXION --------------------


//var client = new pg.Client(conString);

/*
client.connect(function(err) {
  if(err) {
    return console.error('No se pudo conectar a PostGress', err);
  }

  client.query('SELECT * FROM Usuarios ', function(err, result) {
    if(err) {
      		return console.error('Error en el query', err);
    		}

    console.log(result.rows[1].correo);
    client.end();
  });

});
*/


/*
app.get('/usuarios',function(req,res){
	var user ={
		"usuario_id": 0,
		"correo":"",
		"contraseña": ""
	};



})

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
*/

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);



//Servidor o localHost
var port = process.env.PORT || 8888;

app.listen(port, function() {
    console.log('listen on: ' + port);
});