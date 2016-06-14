// Dependencies
var config      = require('../config.json');
var express     = require('express');
var router      = express.Router ();
var pg    = require('pg');
var cors        = require('cors');


//BASE DE DATOS CONEXION (NO NECESARIA AQUI)


var conString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;
pg.defaults.ssl = true;

var client = new pg.Client(conString);


//Routes

//PARA COLOCAR LAS RUTAS, SOLO TIENES QUE COLOCAR /"NOMBREDELARUTA" 

router.get('/home', function(req, res) {
    res.send('im the home page!');  
});

router.get('/users', function(req, res) {

  

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
        var query = client.query("SELECT * FROM usuarios; ");

        // Copiar el resultado del query al arreglo Results. con Results.push(row)
        query.on('row', function(row) {
            
            results.push(row);
            //console.log("------------------" + user_id);
            //console.log(row);
            // res.json(row);
        });

        // Despues que toda la data fue retornada, simplemente usar res.json(results) para enviar
        // los datos como un json a la http.

        query.on('end', function() {
            res.json(results);
            done();

            //return res.json(results);
        

        });

        var u = results.usuarios_id;

        
  //res.send('Numero Usuarios es= ' + u + ' \n' + token + '\n ' + geo);

  });

});
  /*
    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO test(prueba) values($1)", [data.text]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM usuarios ORDER BY usarios_id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

router.get('/usuarios',function(req,res){

  

res.send("ESTA RUTA ESTA FUNCIONANDO");
  
}); */



// Return router
module.exports = router;