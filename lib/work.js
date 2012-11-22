
/**
 * Module exports.
 */

var render = require('./render');
var workObj = require('./work-obj');
var debug = require('debug')('pancake:work');

/**
 * Module exports.
 */

module.exports = work;

/**
 * Check if the request was for a work by searching the "work_names".
 * Render an work if it is good.
 */

function work (req, res, next) {
  // is this an work request?
  var name = req.path.substring(1);
  if ('/' !== name[name.length - 1]) {
    debug('skipping non-work request, no trailing "/" (%s) %j', req.sha, name);
    return next();
  }
  name = name.substring(0, name.length - 1);
  if (!~req.work_names.indexOf(name)) {
    debug('skipping non-work request (%s) %j', req.sha, name);
    return next();
  }

  // render the work and serve it to the client
  debug('got work request (%s) %j', req.sha, name);

  // need to get the "work object" first
  workObj(name)(req, res, onArticle);

  function onArticle (err) {
    if (err) return next(err);
    var locals = {
      work: req.works[name]
    };
    render('views/work.jade', locals)(req, res, next);
  }
}

