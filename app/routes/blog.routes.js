module.exports = (app) => {
  const blogs = require("../controllers/blog.controller.js");

  var router = require("express").Router();

  // Retrieve all blogs
  router.get("/", blogs.findAll);

  // Retrieve a single blog with id
  router.get("/:id", blogs.findById);

  // // Retrieve all published blogs
  // router.get("/is-done", blogs.findAllDone);

  // Create a new Blog
  router.post("/", blogs.create);

  // Update a Blog with id
  router.put("/:id", blogs.update);

  // Delete a Blog with id
  router.delete("/:id", blogs.remove);

  // Delete all blogs
  router.delete("/", blogs.removeAll);

  app.use("/api/v1/blogs", router);
};
