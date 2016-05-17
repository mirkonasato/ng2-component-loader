// Copyright (c) 2016 Mirko Nasato
// MIT Licensed: https://opensource.org/licenses/MIT
'use strict';

const componentDecorator = /^@Component\({([\s\S]*?)^}\)/m;

const substitutions = [
  {
    pattern: /\btemplateUrl:\s*'(.*?)'/,
    replacement: 'template: require(\'$1\')'
  },
  {
    pattern: /\btemplateUrl:\s*"(.*?)"/,
    replacement: 'template: require("$1")'
  },
  {
    pattern: /\bstyleUrls:\s*\[\s*'(.*?)'\s*\]/,
    replacement: 'styles: [require(\'$1\')]'
  },
  {
    pattern: /\bstyleUrls:\s*\[\s*"(.*?)"\s*\]/,
    replacement: 'styles: [require("$1")]'
  }
];

module.exports = function(source) {
  const match = source.match(componentDecorator);
  if (!match) {
    return source;
  }
  let metadata = match[1];
  for (const substitution of substitutions) {
    metadata = metadata.replace(substitution.pattern, substitution.replacement);
  }
  return source.replace(match[0], '@Component({' + metadata + '})');
};
