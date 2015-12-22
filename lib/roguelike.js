var gaussian = require('gaussian');

module.exports = function(items) {
  var item_ids = Object.keys(items);
  var result = {};

  for (var i = 0; i < item_ids.length; i++) {
    var id = item_ids[i];
    var item = items[id];

    // TODO: Does this make sense?
    if (item.spread === 0) {
      setResultLevel(item.level, item.weight, id);
      continue;
    }

    var distribution = gaussian(
      Math.floor(item.level),
      item.spread
    );

    var floor = Math.floor(item.level - item.spread);
    var ceil = Math.ceil(item.level + item.spread);

    for (var level = floor; level <= ceil; level++) {
      if (level < 0) { continue; }

      var score = distribution.pdf(level) * item.weight;

      setResultLevel(level, score, id);
    }
  }

  function setResultLevel(level, score, id) {
    if (!result[level]) {
      result[level] = {
        total: 0,
        strata: [],
        lookup: []
      };
    }

    result[level].total += score;
    result[level].strata.push(result[level].total);
    result[level].lookup.push(id);
  }

  return result;
};
