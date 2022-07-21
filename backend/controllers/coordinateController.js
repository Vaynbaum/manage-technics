const randomController = require("./randomController.js");

const minLatitude = 59.127979327431525;
const minLongitude = 109.14423378540994;
const maxLatitude = 59.642699922802464;
const maxLongitude = 111.28656782197281;
const deltaMove = 0.123456789;

function getCoord(status, coord) {
  if (
    Math.random() > randomController.LimitRandStatus &&
    status != "Свободна"
  ) {
    let res = coord;
    if (randomController.GetRandomInt(1)) {
      res += deltaMove;
    } else {
      res -= deltaMove;
    }
    return res;
  } else {
    return coord;
  }
}

exports.GetRandCoordinates = function (request, response) {
  let cnt = request.query.count;
  let result = [];
  for (let i = 0; i < cnt; i++) {
    result.push({
      coordinateLatitude: randomController.GetRandomArbitrary(
        minLatitude,
        maxLatitude
      ),
      coordinateLongitude: randomController.GetRandomArbitrary(
        minLongitude,
        maxLongitude
      ),
    });
  }
  // отправляем ответ
  response.json(result);
};

exports.GetCoordinates = function (request, response) {
  let coordinates = request.body;
  let result = [];
  for (let i = 0; i < coordinates.length; i++) {
    result.push({
      coordinateLatitude: getCoord(
        coordinates[i].status,
        coordinates[i].coordinateLatitude
      ),
      coordinateLongitude: getCoord(
        coordinates[i].status,
        coordinates[i].coordinateLongitude
      ),
    });
  }
  // отправляем ответ
  response.json(result);
};
