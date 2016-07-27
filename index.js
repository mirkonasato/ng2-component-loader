// Copyright (c) 2016 Mirko Nasato
// MIT Licensed: https://opensource.org/licenses/MIT
'use strict';

const componentDecorator = /^@Component\({([\s\S]*?)^}\)/m;

const substitutions = [
  {
    pattern: /\btemplateUrl\s*:\s*'(.*?)'/,
    replacement: 'template: require(\'$1\')'
  },
  {
    pattern: /\btemplateUrl\s*:\s*"(.*?)"/,
    replacement: 'template: require("$1")'
  },
  {
    pattern: /\bstyleUrls\s*:\s*\[\s*'(.*?)'\s*\]/,
    replacement: 'styles: [require(\'$1\')]'
  },
  {
    pattern: /\bstyleUrls\s*:\s*\[\s*"(.*?)"\s*\]/,
    replacement: 'styles: [require("$1")]'
  }
];

module.exports = function(source) {
  this.cacheable && this.cacheable();
  const componentMatch = componentDecorator.exec(source);
  if (!componentMatch) { return source; }
  let metadata = componentMatch[1];
  for (const substitution of substitutions) {
    metadata = metadata.replace(substitution.pattern, substitution.replacement);
  }
  return source.substring(0, componentMatch.index) +
    '@Component({' + metadata + '})' +
    source.substring(componentMatch.index + componentMatch[0].length);
};
