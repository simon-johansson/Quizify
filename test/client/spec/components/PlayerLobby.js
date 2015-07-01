'use strict';

describe('PlayerLobby', function () {
  var React = require('react/addons');
  var io = require('socket.io-client');
  var TestUtils = React.addons.TestUtils;
  
  var PlayerLobby, component, doc;	

  beforeEach(function () {
    PlayerLobby = require('components/PlayerLobby.js');
    
    // component = React.createElement(PlayerLobby);
    doc = TestUtils.renderIntoDocument( <PlayerLobby /> );
  });

  it('should create a new instance of PlayerLobby', () => {
    expect(doc).to.exist;
  });

  it('should render initial spans', () => {
    var domText,
    	labels = ['Name', 'ID', ''],
    	spans = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'span');

    expect(spans.length).to.be.equal(3);

    for (var k = 0; k < spans.length; k++) {
    	domText = spans[k].getDOMNode().textContent;
    	expect(domText).to.equal(labels[k]);
    }
  });

  it('should render initial inputs', () => {
  	var domText,
    	inputs = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'input');

    expect(inputs.length).to.be.equal(2);

    for (var k = 0; k < inputs.length; k++) {
    	domText = inputs[k].getDOMNode().textContent;
    	expect(domText).to.be.empty;
    }
  });

});
