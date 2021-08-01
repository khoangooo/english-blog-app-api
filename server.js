//import
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//define app
const app = express();

//app middleware
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test app connection
app.get("/", (req, res) => {
  res.send("Connect to nodejs app successfully");
  // res.json({ message: "Connect to nodejs app successfully" });
});

//init pathnames
require("./app/routes/blog.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || process.env.PORT_LC;

//Running app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
