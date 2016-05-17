const fs = require('fs');
const loader = require('../');
const readSource = name => fs.readFileSync(`./spec/source-${name}.ts`, 'utf-8');

describe('loader', () => {

  it('should replace templateUrl and styleUrls with single quotes', () => {
    const result = loader.call({}, readSource('single-quotes'));
    expect(result).not.toContain('templateUrl');
    expect(result).toContain(`template: require('./my.component.html')`);
    expect(result).not.toContain('styleUrls');
    expect(result).toContain(`styles: [require('./my.component.css')]`);
  });

  it('should replace templateUrl and styleUrls with double quotes', () => {
    const result = loader.call({}, readSource('double-quotes'));
    expect(result).not.toContain('templateUrl');
    expect(result).toContain(`template: require("./my.component.html")`);
    expect(result).not.toContain('styleUrls');
    expect(result).toContain(`styles: [require("./my.component.css")]`);
  });

  it('should replace templateUrl and styleUrls with complex source', () => {
    const result = loader.call({}, readSource('complex'));
    expect(result).not.toContain('templateUrl');
    expect(result).toContain(`template: require('./my.component.html')`);
    expect(result).not.toContain('styleUrls');
    expect(result).toContain(`styles: [require('./my.component.css')]`);
  });

});
