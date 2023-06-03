// подключение express
const express = require('express');
var cors = require("cors");
const jsonParser = express.json();
const port = process.env.PORT || 8080;
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
app.get("/", (req, res) => {
  res.send("Hello from Space! 🚀");
});


app.listen(port, () => {
  console.log("🚀 Server ready");
});
