/* deps */

var http = require('http')
  , port = parseInt(process.env.PANCAKE_IO_PORT, 10) || process.env.PORT || 3000
  , app = require('./app');

  //, Stack = require('stack')
  //, Creationix = require('creationix')
// process title
//

process.title = 'pancake';



// create stack server

//http.createServer(Stack(
//  Creationix.log(),
//  require('wheat')(__dirname)
//  )).listen(3000);

// create the HTTP server
//

var server = http.createServer(app);

// Listen.
//

server.listen(port, function() {
  port = server.address().port;
  console.log('pancake %j server listening on port %d', app.settings.env, port);
  console.log('libgit2 version %j', app.settings.version);
});
