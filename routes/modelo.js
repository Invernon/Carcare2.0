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

  

  var marca_id = req.param('id');
  var results = [];

   // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
  // SQL Query > Select Modelo a partir de un id que paso por url

      
        //var query = client.query("SELECT * FROM usuarios WHERE usuarios_id = ($1) ", [user_id] );
        var query = client.query("SELECT modelo.nombre , modelo.modelo_id FROM modelo WHERE modelo.marca_id = ($1) order by modelo.nombre ASC;", [marca_id]);

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