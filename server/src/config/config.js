module.exports = {
  port: process.env.PORT || 8081,
  // Production Checklist: Be sure to include these envirnment variables
  db: {
    database: process.env.DB_NAME || "developmentDatabase",
    user: process.env.USER || "developmentUser",
    password: process.env.PASS || "developmentPass",
    options: {
      dialect: process.env.DB_DIALECT || "sqlite",
      host: process.env.DB_HOST || "localhost",
      storage: "./projectDatabases.sqlite"
    }
  }
};
