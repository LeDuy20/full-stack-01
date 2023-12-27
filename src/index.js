import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser"
require("dotenv").config();

const app = express();
//config view engine
configViewEngine(app);

// Config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
