const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_MONTH = 60 * 60 * 24 * 7 * 4;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_MONTH
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use"
      });
      // email already exists
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      // Send error if no user exists
      if (!user) {
        return res.status(403).send({
          error: "The login information is incorrect"
        });
      }

      if (!user.isActive) {
        return res.status(403).send({
          error:
            "Your account is inactive. If this is a mistake, please contact us."
        });
      }

      // CHeck to see if the password is correct
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "The login information is incorrect"
        });
      }

      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured while trying to login"
      });
    }
  }
};
