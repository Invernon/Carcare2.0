// Dependencies
var config 			= require('../config.json');
var express = require('express');
var router = express.Router ();
var pg 		= require('pg');

var conString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.db;
pg.defaults.ssl = true;

var client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('No se pudo conectar a PostGress', err);
  }

  var query = client.query('CREATE TABLE test(id SERIAL PRIMARY KEY, prueba VARCHAR(40) not null)');
query.on('end', function() { client.end(); });

});


//Return model

module.exports = router ;