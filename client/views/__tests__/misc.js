'use strict';

describe('process.env', () => {

  it('should exist', () => {
    expect(process.env).to.exist;
    expect(process.env).to.be.an('object');
  });

  it('should have NODE_ENV property', () => {
    expect(process.env.NODE_ENV).to.exist;
    expect(process.env.NODE_ENV).to.eql('test');
  });

  it('should have GA_TRACKING_ID property', () => {
    expect(process.env.GA_TRACKING_ID).to.exist;
    expect(process.env.GA_TRACKING_ID).to.eql('UA-40124062-2');
  });

});
