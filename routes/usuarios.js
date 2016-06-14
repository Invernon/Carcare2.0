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
  //var token = req.param('token');
  //var geo = req.param('geo');

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

    //var query = client.query("SELECT * FROM usuarios WHERE usuarios_id = ($1) ", [user_id] );
        var query = client.query("SELECT vehiculo.vehiculo_id, modelo.nombre as modelo, marca.nombre as marca, vehiculo.ano, vehiculo.kilometraje FROM vehiculo INNER JOIN modelo ON vehiculo.modelo = modelo.modelo_id INNER JOIN marca ON modelo.marca_id = marca.marca_id WHERE vehiculo.usuario_id = ($1) ; ", [user_id]) ;


    // Stream results back one row at a time
        query.on('row', function(row) {
        results.push(row);

        console.log(row);

           // res.json(row);

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(results);
            done();
        });

        var u = results.usuarios_id;
  });

});

//Crear o nuevo elemento
router.get('/post', function(req, res) {

  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

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

    //var query = client.query("SELECT * FROM usuarios WHERE usuarios_id = ($1) ", [user_id] );
        var query = client.query("SELECT * FROM vehiculo WHERE usuario_id = 1");

    // Stream results back one row at a time
        query.on('row', function(row) {
        results.push(row);
        console.log(row);

           // res.json(row);

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(results);
            done();
        });

  });

});


 


// Return router
module.exports = router;