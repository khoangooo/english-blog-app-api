module.exports = (app) => {
  const images = require("../controllers/image.controller.js");

  var router = require("express").Router();

  // Retrieve a single image width url
  router.get("/:id", images.generatePublicUrl);

  // Upload new image
  router.post("/", images.upload);

  // Delete an image with Id
  router.delete("/:id", images.delete);

  // // Delete all blogs
  // router.delete("/", blogs.removeAll);

  app.use("/api/v1/images", router);
};
