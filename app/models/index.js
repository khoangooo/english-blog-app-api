//Import
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const dbConfig = require("../config/db.config.js");
const db = {};

mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.DB_PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("connected to mongoose");
}).catch(() => {
  console.log("MongoDB connection error");
})

//Define a schema
const { Schema, model } = mongoose;

//Initialize plugin
mongoose.plugin(slug);

db.Schema = Schema;
db.model = model;
db.blogs = require("./blog.model")(Schema, model);

module.exports = db;
