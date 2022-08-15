// подключение express
const express = require('express');
var cors = require("cors");
const jsonParser = express.json();

// подключение swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// подключаем контроллеры
const statusController = require("./controllers/statusController.js");
const coordinateController = require("./controllers/coordinateController.js");

// создаем объект приложения
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());

app.get("/statuses", statusController.GetStatuses);
app.get("/one-status", statusController.GetOneStatus);
app.get("/randstatus", statusController.RandStatus);

app.get("/randcoordinates", coordinateController.GetRandCoordinates);
app.post("/coordinates", jsonParser, coordinateController.GetCoordinates);

// начинаем прослушивать подключения на 3001 порту
app.listen(3001, () => {
  console.log("🚀 Server ready");
});

// export 'app'
module.exports = app