const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Used for logging
app.use(morgan("combined"));

// Body parser middleware
app.use(bodyParser.json());

// TODO chnage before production
app.use(cors());

app.post("/register", (req, res) => {
  res.send({
    message: `Hello, ${req.body.email} you are registered`
  });
});

app.listen(process.env.PORT || 8081);
