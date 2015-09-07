'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Latency = require('../Latency');

describe('Latency', () => {

  it('should create a new instance of Latency', () => {
    let render = TestUtils.renderIntoDocument(<Latency />);
    expect(render).to.exist;
  });

  it('should consist of "Click here..." text before being clicked', () => {
    const markup = React.renderToStaticMarkup(<Latency />);
    expect(markup).to.contain('Click for latency');
  });

  it('should show latency elements after clicking the element', () => {
    let instance = TestUtils.renderIntoDocument(<Latency />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let pillers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-figures');
    let numbers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-numbers');

    expect(pillers).to.exist;
    expect(numbers).to.exist;

    let figures = TestUtils.scryRenderedDOMComponentsWithTag(element, 'figure');
    expect(figures.length).to.eql(4);
  });

  it('should show latency in ms if props are passed in', () => {
    let instance = TestUtils.renderIntoDocument(<Latency latency={243} />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let numbers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-numbers');
    expect(numbers.getDOMNode().innerHTML).to.contain('243');
  });

  it('should light up "one" latency pillars if latency is above 450 ms', () => {
    let instance = TestUtils.renderIntoDocument(<Latency latency={460} />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let pillers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-figures');
    expect(pillers.getDOMNode().className).to.not.contain('level-2');
    expect(pillers.getDOMNode().className).to.not.contain('level-3');
    expect(pillers.getDOMNode().className).to.not.contain('level-4');
  });

  it('should light up "two" latency pillars if latency is under 450 ms', () => {
    let instance = TestUtils.renderIntoDocument(<Latency latency={440} />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let pillers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-figures');
    expect(pillers.getDOMNode().className).to.contain('level-2');
    expect(pillers.getDOMNode().className).to.not.contain('level-3');
    expect(pillers.getDOMNode().className).to.not.contain('level-4');
  });

  it('should light up "three" latency pillars if latency is under 300 ms', () => {
    let instance = TestUtils.renderIntoDocument(<Latency latency={300} />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let pillers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-figures');
    expect(pillers.getDOMNode().className).to.contain('level-2');
    expect(pillers.getDOMNode().className).to.contain('level-3');
    expect(pillers.getDOMNode().className).to.not.contain('level-4');
  });

  it('should light up "four" latency pillars if latency is under 150 ms', () => {
    let instance = TestUtils.renderIntoDocument(<Latency latency={150} />);
    let element = TestUtils.findRenderedDOMComponentWithClass(instance, 'latency-indicator');
    TestUtils.Simulate.click(element);
    let pillers = TestUtils.findRenderedDOMComponentWithClass(element, 'latency-figures');
    expect(pillers.getDOMNode().className).to.contain('level-2');
    expect(pillers.getDOMNode().className).to.contain('level-3');
    expect(pillers.getDOMNode().className).to.contain('level-4');
  });
});
