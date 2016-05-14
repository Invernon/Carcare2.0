var http = require('http');

var server = http.createServer(function(
	req, res){

	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('<h1> Car Care Para todos </h1>');
});

var port = Number(process.env.PORT || 3000 );

server.listen(port);
console.log("Server is listening");

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})