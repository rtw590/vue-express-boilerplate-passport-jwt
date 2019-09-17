const { User } = require("../models");

module.exports = {
  async isAdmin(req, res) {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    if (!user || user.isAdmin === false) {
      res.status(403).send({
        error:
          "You are not authorized. If this is an error, please login again."
      });
    } else {
      res.send({
        message: "You have access"
      });
    }
  },
  async admin(req, res) {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    if (!user || user.isAdmin === false) {
      res.status(403).send({
        error:
          "You are not authorized. If this is an error, please login again."
      });
    } else {
      const users = await User.findAll();
      res.send({
        users
      });
    }
  },
  async active(req, res) {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    if (!user || user.isAdmin === false) {
      res.status(403).send({
        error:
          "You are not authorized. If this is an error, please login again."
      });
    } else {
      // console.log(req.body);
      const userChanging = await User.findOne({
        where: {
          id: req.body.id
        }
      });
      if (req.body.isActive === true) {
        userChanging.isActive = true;
      } else {
        userChanging.isActive = false;
      }
      userChanging.save();
      res.send({
        message: "User updated"
      });
    }
  }
};
