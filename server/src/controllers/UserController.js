const { User } = require("../models");

module.exports = {
  async dashboard(req, res) {
    try {
      res.send({
        message: "Route protected and working"
      });
    } catch (err) {
      res.status(400).send({
        error: "TODO: Update error message here or remove try catch"
      });
    }
  }
};
