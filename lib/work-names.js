
/**
 * Module dependencies.
 */

var fs = require('fs');
var ref = require('ref');
//var git = require('./git');
var path = require('path');
var LRU = require('lru-cache');
//var GitError = require('./git-error');
var debug = require('debug')('pancake:work-names');

/**
 * Module exports.
 */

module.exports = workNames;

/**
 * The cache.
 * Keys are commit SHAs. Values are Arrays of Strings of valid work names.
 */

//var cache = LRU({
//  max: 500,
//  length: function (v) { return v.length; }, // array length
//  dispose: function (k, v) { debug('disposing of cache item %j', k, v); }
//});
//
///**
// * `git_tree **` type.
// */
//
//var git_tree_ptr = ref.refType(git.git_tree);

/**
 * Populates `req.work_names` with an Array of Strings of the names of valid
 * blog works. An LRU cache is in place so that subsequent requests are cached.
 */

function workNames (req, res, next) {
  debug('populating `req.work_names`');

  // use fs
  var works_dir = path.join(req.app.settings.repo_path, 'works');
  fs.readdir(works_dir, function (err, files) {
    if (err) return next(err);
    req.work_names = files.map(function (f) {
      return f.replace(/\.markdown$/, '');
    });
    next();
  });
  return;
  
  // check the cache first when in prod mode
//  var works;
//
//  // do an fs.readdir when in "dev" mode
//  if (req.is_root && !req.app.settings.bare && !req.app.settings.prod) {
//    debug('dev: getting works names using `fs.readdir`');
//    var works_dir = path.join(req.app.settings.repo_path, 'works');
//    fs.readdir(works_dir, function (err, files) {
//      if (err) return next(err);
//      req.work_names = files.map(function (f) {
//        return f.replace(/\.markdown$/, '');
//      });
//      next();
//    });
//    return;
//  }
//
//  if (req.app.settings.prod) {
//    works = cache.get(req.sha);
//    if (Array.isArray(works)) {
//      debug('cache hit for `req.work_names` for sha', req.sha);
//      req.work_names = works;
//      return next();
//    }
//  }
//
//  // need to fetch work names from the git repo
//  var root, works_tree, repo, err;
//  repo = req.app.settings.repo;
//  root = req.root_tree;
//  works = [];
//
//  // get the "git_entry" instance for the "works" dir
//  var works_entry = git.git_tree_entry_byname(root, 'works');
//  if (works_entry.isNull()) {
//    return next(new Error('"works" dir does not exist for this commit'));
//  }
//
//  // get the "git_tree" instance for the "works" dir
//  works_tree = ref.alloc(git_tree_ptr);
//  err = git.git_tree_entry_to_object(works_tree, repo, works_entry);
//  if (err !== 0) return next(new GitError('git_tree_entry_to_object', err));
//  works_tree = works_tree.deref();
//
//  // iterate over the "git_entry" instances inside the "works" dir
//  var count = git.git_tree_entrycount(works_tree);
//  for (var i = 0; i < count; i++) {
//    var entry = git.git_tree_entry_byindex(works_tree, i);
//    var name = git.git_tree_entry_name(entry);
//    works.push(name.replace(/\.markdown$/, ''));
//  }
//
//  // free() the `git_tree` instance for the "works" dir
//  git.git_tree_free(works_tree);
//
//  // set the cache (in prod mode) and `req.work_names`
//  debug('done getting valid work names (%s) %j', req.sha, works);
//  req.work_names = works;
//  if (req.app.settings.prod) {
//    debug('setting cache %j', req.sha);
//    cache.set(req.sha, works);
//  }
  next();
}

