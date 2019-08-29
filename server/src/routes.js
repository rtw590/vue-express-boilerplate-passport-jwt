const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

// Add this before any protected route
const isAuthenticated = require("./policies/isAuthenticated");

module.exports = app => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  // Test route to see if authentication with passport is working
  app.get("/dashboard", isAuthenticated);
};
