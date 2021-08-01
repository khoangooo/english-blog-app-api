require("dotenv").config();
module.exports = {
  //connect to mongodb
  // USERNAME : process.env.USERNAME || process.env.USERNAME_LC
  // PASSWORD_LC : process.env.PASSWORD || process.env.PASSWORD_LC
  HOST: process.env.HOST || process.env.HOST_LC,
  DB_PORT: process.env.DB_PORT || process.env.DB_PORT_LC,
  DB: process.env.DB || process.env.DB_LC,
};
