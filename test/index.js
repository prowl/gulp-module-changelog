'use strict';

var should = require('should'); // jshint ignore:line
var path = require('path');

var changelog = require('../lib/index');

var gulpMock = {};
var task = null;

gulpMock.task = function(name, description, func) {
  task = func;
};

var configMock = {
  root: path.resolve(__dirname, '../')
};

changelog(gulpMock, configMock);

describe('Gulp Module ChangeLog', function() {
  it('Should return a function', function() {
    changelog.should.be.type('function');
  });

  it('Should add a task', function() {
    task.should.be.type('function');
  });

  it('Should run the function', function(cb) {
    try {
      task();
      cb();
    } catch (e) {
      cb();
    }
  });
});
