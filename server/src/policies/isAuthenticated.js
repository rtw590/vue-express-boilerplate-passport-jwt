const passport = require("passport");

module.exports = function(req, res, next) {
  passport.authenticate("jwt", function(err, user) {
    if (err || !user) {
      console.log("error ran in is authenticated");
      res.status(403).send({
        error: "Please login"
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
