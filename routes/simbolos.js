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

var simbolos = [];

   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
  // SQL Query > Select Marca

        var query = client.query("SELECT simbolo_id , nombre_simbolo as nombre , url_simbolo FROM simbolos Order By nombre ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            simbolos.push(row);
            console.log(row);

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(simbolos);
            done();
        });
  });

});

router.get('/id', function(req, res) { 

var descripcion = [];
var simbolo_id = req.param('id');

   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
  // SQL Query > Select Descripcion del Simbolo

        var query = client.query("SELECT nombre_simbolo as nombre , descripcion_simbolo as descripcion FROM simbolos Where simbolo_id = $1;", [simbolo_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            
            descripcion.push(row);
            console.log(row);

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            res.json(descripcion);
            done();
        });
  });

});

 


// Return router
module.exports = router;