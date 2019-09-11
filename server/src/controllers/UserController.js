const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt-nodejs");

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
  async updatePassword(req, res) {
    try {
      const currentDate = Date.now();
      const { email, password, resetCode } = req.body;
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

      // Check to see if the reset code matches what the user submitted
      if (user.resetCode != resetCode) {
        return res.status(403).send({
          error: "Wrong reset code"
        });
      }

      // Check to see if the reset code has expired
      if (currentDate > user.resetCodeDate) {
        return res.status(403).send({
          error: "Reset code expired"
        });
      }

      // Set resetCode and resetCodeDate back to 0
      user.resetCode = 0;
      user.resetCodeDate = 0;

      // Bcrypt the users password and save the change
      let passwordHashed = password;
      passwordHashed = bcrypt.hashSync(
        passwordHashed,
        bcrypt.genSaltSync(5),
        null
      );
      user.password = passwordHashed;

      user.save();

      // Everything passed so send the user back a success message
      res.send({
        message: "Password reset. You can now login"
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
      const resetCode = Math.floor(Math.random() * 90000) + 10000;
      user.resetCode = resetCode;

      // Set date for reset code
      const ONE_HOUR = 60 * 60 * 1000; /* ms */

      const currentDateTime = Date.now();

      // Set a time 1 hour later so that the code can expire
      const hourLater = currentDateTime + ONE_HOUR;
      user.resetCodeDate = hourLater;
      user.save();

      // Start nodemailer email code
      // TODO: Style email further
      const output = `
        <h4 style="font-weight: 700">Your password reset code: ${resetCode}</h4>
        <p>Please enter your code into our website to reset your password</p>
      `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // setup email data with unicode symbols
      // Production Checklist: Make sure to update this information
      let mailOptions = {
        from: '"Rob W" <robtw590@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Password Reset", // Subject line
        text: "Here is your reset code", // plain text body
        html: output // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

      // End nodemailer email code

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
  },
  async changePassword(req, res) {
    try {
      const { password, currentPassword } = req.body;
      const user = await User.findOne({
        where: {
          id: req.user.id
        }
      });
      console.log(user);
      // If no user is found send back an error message to the suer
      if (!user) {
        return res.status(403).send({
          error: "No user found with this email address"
        });
      }

      // TODO: Check to see if submitted password is the same as what is in the database

      // Check if new password is 8 characters long
      if (password.length < 8) {
        return res.status(403).send({
          error: "Password must be at least 8 characters"
        });
      }

      // Bcrypt the users password and save the change
      let passwordHashed = password;
      passwordHashed = bcrypt.hashSync(
        passwordHashed,
        bcrypt.genSaltSync(5),
        null
      );
      user.password = passwordHashed;

      user.save();

      // Everything passed so send the user back a success message
      res.send({
        message: "Password changed. You can now login"
      });
    } catch (err) {
      res.status(400).send({
        error: "TODO: Update error message here or remove try catch!"
      });
    }
  }
};
