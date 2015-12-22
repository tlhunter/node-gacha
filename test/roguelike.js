var roguelike = require('../lib/roguelike.js');
var assert = require('assert');
var sample_data = require('./data/sample-roguelike.json');
var small_data = require('./data/small-roguelike.json');

describe('Roguelike', function() {
  it('works', function() {
    var result = roguelike(sample_data);
    console.log(result);
  });

  it('works', function() {
    var result = roguelike(small_data);

    var random = Math.random() * result[3].total;

    for (var i = 0; i < result[3].strata.length; i++) {
      if (random < result[3].strata[i]) {
        var id = result[3].lookup[i];
        console.log(id);
        break;
      }
    }
  });
});
