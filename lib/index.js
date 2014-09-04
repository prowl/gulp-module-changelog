'use strict';

var changeLog = require('conventional-changelog');
var path = require('path');
var fs = require('fs');

// just a local variable to hold a reference to the config
var config = null;

// local variable to keep from calculating the path to the output file more than once
var file = null;

/**
 * Adds the change log generation task to gulp
 *
 * @param {Object} gulp the instance of gulp to attach the task to
 * @param {Object} conf The configuration Object
 */
function changeLogSetup(gulp, conf) {
  // save a reference to the conf parameter
  config = conf;

  gulp.task('changelog', false, changeLogTask);
}

/**
 * Creates the changelog since the last published tag
 *
 */
function changeLogTask() {
  // read the version, repository, and versionName from the package.json
  var packageJson = require(path.resolve(config.root, 'package.json'));
  var version = packageJson.version;
  var repo = packageJson.repository.url;
  var versionName = packageJson.versionName;

  // set the path to the output file
  file = path.resolve(config.root, 'changelog.md');

  // run the module to get the new file contents
  changeLog({
    version: version,
    subtitle: versionName,
    repository: repo,
    file: file
  }, changeLogCallback);
}

/**
 * Writes the updated changelog back to disk
 *
 * @param {Object} err Any error thrown by the changeLog module
 * @param {Buffer} log The buffer representing the new change log
 */

function changeLogCallback(err, log) {
  // if there's an error we need to stop execution
  if (err) {
    throw err;
  }

  // output the new contents to the file
  fs.writeFileSync(file, log, {'encoding': 'UTF-8'});
}

module.exports = changeLogSetup;
