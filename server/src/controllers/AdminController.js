const { User } = require("../models");

module.exports = {
  async admin(req, res) {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    console.log(user);
    if (!user || user.isAdmin === false) {
      res.status(403).send({
        error:
          "You are not authorized. If this is an error, please login again."
      });
    } else {
      res.send({
        message: "Admin Route protected and working"
      });
    }
  }
};
