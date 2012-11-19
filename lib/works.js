
/**
 * Module dependencies.
 */

var render = require('./render');
var debug = require('debug')('pancake:works');
var sortedArticles = require('./sorted-works');

/**
 * Module exports.
 */

module.exports = works;

/**
 * Render and serve the "/works" page for the current commit.
 */

function works (req, res, next) {
  debug('rendering %j (%s)', req.path, req.sha);

  // need to get the "sorted_works" first
  sortedArticles(req, res, function (err) {
    if (err) return next(err);
    var locals = {
      works: req.sorted_works
    };
    render('views/works.jade', locals)(req, res, next);
  });
}

