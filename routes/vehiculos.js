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

  var user_id = req.param('id');

  var results = [];

   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

    // SQL Query > Select Data

    var query = client.query("SELECT * FROM vehiculo WHERE usuario_id = ($1) ", [user_id] );
       // var query = client.query("SELECT * FROM vehiculo WHERE usuario_id = 1");

    // Stream results back one row at a time
        query.on('row', function(row) {
        results.push(row);
        console.log(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(results);
            done();
        });
  });

});

//Crear Nuevo Vehiculo.

router.post('/', function(req, res) {

  var user_id = req.body.usuario_id;
  var marca = req.body.marca;
  var modelo = req.body.modelo; 
  var km = req.body.kilometraje;
  var year = req.body.ano; 
  
  /*
  var user_id = req.param('id');
  var marca = req.param('marca');
  var modelo = req.param('modelo'); 
  var km = req.param('km');
  var year = req.param('year'); 
  */

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
    var query = client.query("INSERT INTO vehiculo (usuario_id,marca,modelo,kilometraje,ano) VALUES ($1,$2,$3,$4,$5) ;",[user_id,marca,modelo,km,year]);
    done();

    res.send("El registro que se creo fue: " + user_id +" "+marca+" "+modelo+" "+km+" "+year);
    //http://localhost:8888/vehiculos/delete?id=1
    
        
  });

});


//Eliminar Vehiculo.

router.get('/delete', function(req, res) {

  /*if(!req.params.v_id) {
    res.statusCode = 404;
    return res.json({ codigo: -1 , mensaje :'Error 404: No se pudo eliminar el elemento'});
     } */

  var vehiculo_id = req.param('v_id');

  console.log ("LLEGUE AQUI : " + vehiculo_id);

   // Get a Postgres client from the connection pool
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

    // SQL Query > Eliminar Data mendiante el Vehiculo_ID.

    //http://localhost:8888/vehiculos/delete?id=1
    var query = client.query("Delete from estado where vehiculo_id = $1;", [vehiculo_id]);
    var query = client.query("Delete from vehiculo where vehiculo_id = $1;", [vehiculo_id]);

    res.send("Elemento Eliminado Correctamente!")
        
  });

});


// Return router
module.exports = router;