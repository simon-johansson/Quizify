/**
 * Test setup for server-side tests.
 */
var chai      = require("chai");
var sinon     = require("sinon");
var sinonChai = require("sinon-chai");

// Add chai plugins.
chai.use(sinonChai);

// Add test lib globals.
global.expect = chai.expect;
global.sinon  = sinon;

// Set test environment
process.env.NODE_ENV = "test";
