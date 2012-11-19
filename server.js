/* deps */

var http = require('http')
  , app = require('./app')
  , port = parseInt(process.env.PANCAKE_IO_PORT, 10) || 3000;

  // process title
  //

process.title = 'pancake';

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
