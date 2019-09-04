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
  },
  async sendPasswordCode(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      // If no user is found send back an error message to the suer
      if (!user) {
        return res.status(403).send({
          error: "No user found with this email address"
        });
      }

      // Set a reset code for the user
      user.resetCode = Math.floor(Math.random() * 90000) + 10000;

      // Set date for reset code
      const ONE_HOUR = 60 * 60 * 1000; /* ms */

      const currentDateTime = Date.now();

      // Set a time 1 hour later so that the code can expire
      const hourLater = currentDateTime + ONE_HOUR;
      user.resetCodeDate = hourLater;
      user.save();

      // TODO: Send the user an email with their reset code

      // Everything succeeded so we let the user know
      res.send({
        message:
          "Email sent. Please enter reset code from your email and enter your new password"
      });
    } catch (err) {
      res.status(400).send({
        error: "Failed to send password reset code"
      });
    }
  }
};
