/* deps */

var http = require('http')
  , Stack = require('stack')
  , Creationix = require('creationix')
  , port = parseInt(process.env.PANCAKE_IO_PORT, 10) || 3000;
  //, app = require('./app')

  // process title
  //

process.title = 'pancake';

// create the HTTP server
//

//var server = http.createServer(app);


// create stack server

http.createServer(Stack(
  Creationix.log(),
  require('wheat')(__dirname)
  )).listen(3000);

// Listen.
//

//server.listen(port, function() {
//  port = server.address().port;
//  console.log('pancake %j server listening on port %d', app.settings.env, port);
//  console.log('libgit2 version %j', app.settings.version);
//});
