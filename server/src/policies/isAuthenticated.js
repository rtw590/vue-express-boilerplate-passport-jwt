const passport = require("passport");

module.exports = function(req, res, next) {
  passport.authenticate("jwt", function(err, user) {
    if (err || !user) {
      res.status(403).send({
        error: "you do not have access to this resource"
      });
    } else {
      req.user = user;
      // Temp while debugging
      res.send({
        message: `it worked user is ${req.user.id}`
      });
      // End temp
      // next();
    }
  })(req, res, next);
};
