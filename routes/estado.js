// Dependencies
var config      = require('../config.json');
var express     = require('express');
var router      = express.Router ();
var pg    = require('pg');


//BASE DE DATOS CONEXION (NO NECESARIA AQUI)


var conString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;
pg.defaults.ssl = true;

var client = new pg.Client(conString);


//Routes

//PARA COLOCAR LAS RUTAS, SOLO TIENES QUE COLOCAR /"NOMBREDELARUTA" 

router.get('/', function(req, res) { 

var estado = [];
var vehiculo_id = req.param('id');

   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
  // SQL Query > Select Marca

        var query = client.query("SELECT * FROM estado WHERE vehiculo_id = $1;", [vehiculo_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            estado.push(row);
            console.log(row);

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(estado);
            done();
        });
    });
});    

//Crear Nuevo Estado.

router.post('/', function(req, res) {

  if(!req.body.hasOwnProperty('vehiculo_id') || 
     !req.body.hasOwnProperty('neumaticos') || 
     !req.body.hasOwnProperty('frenos') || 
     !req.body.hasOwnProperty('bateria')) {
    res.statusCode = 400;
    return res.send('Error 401: Post syntax incorrect.');
     } 
  
    var ve_id = req.body.vehiculo_id ;
    var frenos = req.body.frenos ;
    var neumaticos = req.body.neumaticos ; 
    var bateria = req.body.bateria ;
 
   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

    // SQL Query > Agregar nuevo registro

    //http://localhost:8888/vehiculos/post?id=3&marca=3&modelo=2&km=15880&year=2005
    var query = client.query("INSERT INTO estado (vehiculo_id,frenos,bateria,neumaticos) VALUES ($1,$2,$3,$4) ;",[ve_id,frenos,bateria,neumaticos]);
    console.log("ESTO ES : " + ve_id + " " + frenos );

    done();
        
  });

});
 


// Return router
module.exports = router;