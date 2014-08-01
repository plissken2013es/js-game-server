'use strict';

var fs = require('fs');
var sinon = require('sinon');
var should = require('should');

var config = require('../lib/config');
var mockFS;

describe('Configuration', function() {

  describe('Load Configuration', function() {
    require('../lib/logger').setConfig({silentSTDIO:true});

    beforeEach(function() {
      mockFS = sinon.mock(fs);
    });

    afterEach(function() {
      mockFS.restore();
      config.clearCache();
    });

    config.configPlaces = [
      ['nowhere1/config.json', null, false],
      ['nowhere2/config.json', null, true],
      ['nowhere3/config.json', null, true],
      ['../config.dist.json', null, true]
    ];

    it('should load the default file when all other fails', function() {
      config.loadConfig().should.have.property('sanctioned_modules').with.lengthOf(6);
    });

    it('should load the config when user try to get some data', function() {
      config.get('sanctioned_modules').should.have.lengthOf(6);
    });
  });

});
