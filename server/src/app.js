const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const config = require("./config/config");

const app = express();

// Used for logging
app.use(morgan("combined"));

// Body parser middleware
app.use(bodyParser.json());

// TODO chnage before production
app.use(cors());

require("./routes")(app);

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
});
