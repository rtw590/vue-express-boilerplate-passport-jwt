const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const UserController = require("./controllers/UserController");
const AdminController = require("./controllers/AdminController");

// Add this before any protected route
const isAuthenticated = require("./policies/isAuthenticated");

module.exports = app => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  app.get("/dashboard", isAuthenticated, UserController.dashboard);
  app.get("/admin", isAuthenticated, AdminController.admin);
  app.get("/isAdmin", isAuthenticated, AdminController.isAdmin);
  app.post("/sendPasswordCode", UserController.sendPasswordCode);
  app.post("/updatePassword", UserController.updatePassword);
  app.post("/changePassword", isAuthenticated, UserController.changePassword);
  app.post("/active", isAuthenticated, AdminController.active);
};
