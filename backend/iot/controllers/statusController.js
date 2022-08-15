const randomController = require("./randomController.js");

const statuses = {
  Работает: ["Свободна", "Перегрузка"],
  Свободна: ["Работает"],
  Перегрузка: ["Работает"],
};

const setStatuses = ["Свободна", "Перегрузка", "Работает"];

function getStatus(status) {
  s = statuses[status];
  return s ? s[randomController.GetRandomInt(s.length)] : null;
}

exports.GetStatuses = function (request, response) {
  result = [];

  let qs = request.query.statuses;
  for (let i = 0; i < qs.length; i++) {
    if (Math.random() > randomController.LimitRandStatus) {
      s = getStatus(qs[i]);
      result.push(s ? s : qs[i]);
    } else {
      result.push(qs[i]);
    }
  }

  // отправляем ответ
  response.json(result);
};

exports.GetOneStatus = function (request, response) {
  result = [];
  let qs = request.query.status;
  if (Math.random() > randomController.LimitRandStatus) {
    s = getStatus(qs);
    result.push(s ? s : qs);
  } else {
    result.push(qs);
  }
  // отправляем ответ
  response.json(result);
};

exports.RandStatus = function (request, response) {
  let cnt = request.query.count;
  let result = [];
  for (let i = 0; i < cnt; i++) {
    result.push(
      setStatuses[randomController.GetRandomInt(setStatuses.length)]
    );
  }
  // отправляем ответ
  response.json(result);
};
