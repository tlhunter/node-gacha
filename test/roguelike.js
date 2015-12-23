var roguelike = require('../lib/roguelike.js');
var assert = require('assert');

var data_complex = require('./fixtures/roguelike-complex.json');
var data_double = require('./fixtures/roguelike-double.json');
var data_single = require('./fixtures/roguelike-single.json');

describe('Roguelike', function() {
  describe('single item, level 5, spread 3', function() {
    var result;

    before(function() {
      result = roguelike(data_single);
    });

    it('has expected levels', function() {
      assert.deepEqual(Object.keys(result), [
        '2', '3', '4', '5', '6', '7', '8'
      ]);
    });

    it('is symmetrical', function() {
      assert.equal(result[2].total, result[8].total);
      assert.equal(result[3].total, result[7].total);
      assert.equal(result[4].total, result[6].total);
    });

    it('is biggest in the center', function() {
      assert(result[5].total > result[4].total);
      assert(result[4].total > result[3].total);
      assert(result[3].total > result[2].total);
    });
  });

  describe('double items with overlap', function() {
    var result;

    before(function() {
      result = roguelike(data_double);
    });

    it('has expected levels', function() {
      assert.deepEqual(Object.keys(result), [
        '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
      ]);
    });

    it('has expected lookups', function() {
      assert.deepEqual(result[2].lookup, ['101']);

      for (var i = 3; i <= 8; i++) {
        assert.deepEqual(result[i].lookup, ['101', '102']);
      }

      for (var j = 9; j <= 11; j++) {
        assert.deepEqual(result[j].lookup, ['102']);
      }
    });
  });

  describe('complex items', function() {
    var result;

    before(function() {
      result = roguelike(data_complex);
    });

    it('has key gaps', function() {
      assert.deepEqual(Object.keys(result), [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '20'
      ]);
    });

    it('always has the same number of strata as lookup', function() {
      var levels = Object.keys(result);

      for (var index = 0; index < levels.length; index++) {
        var level_id = levels[index];
        assert.equal(result[level_id].strata.length, result[level_id].lookup.length);
      }
    });

    it('total is always equal to last strata', function() {
      var levels = Object.keys(result);

      for (var index = 0; index < levels.length; index++) {
        var level_id = levels[index];
        var last_strata = result[level_id].strata[result[level_id].strata.length - 1];
        assert.equal(result[level_id].total, last_strata);
      }
    });

    it('strata are always ascending', function() {
      var levels = Object.keys(result);

      for (var index = 0; index < levels.length; index++) {
        var level = result[levels[index]];

        for (var strata = 0; strata < level.strata.length - 1; strata++) {
          assert(level.strata[strata] < level.strata[strata + 1]);
        }
      }
    });
  });
});
