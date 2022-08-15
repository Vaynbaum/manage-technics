exports.GetRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

exports.GetRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

exports.LimitRandStatus = 0.7;
