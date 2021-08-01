const db = require("../models");
const utils = require("../utils");
const Blog = db.blogs;

// Retrieve all blogs from the database.
exports.findAll = async (req, res) => {
  //filter
  const filter = req.query?.filter
    ? utils.getFilterFields(req.query.filter)
    : null;
  const queryString = filter?.slug
    ? { title: { $regex: `.*${filter.slug}.*` } }
    : {};
  //pagination
  const per_page = +req.query.per_page || 20;
  const page_number = +req.query.page_number || 1;
  const skip = per_page * (page_number - 1);

  try {
    let total = await Blog.countDocuments();
    const data = await Blog.find(queryString)
      .skip(skip)
      .limit(per_page)
      .sort("-updated_at");
    const pagination = {
      total,
      per_page,
      page_number,
    };
    res.send({
      status: true,
      message: `Reaching all blogs successfully.`,
      data,
      pagination,
    });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || `Some error occurred while retrieving blogs.`,
    });
  }
};

// Retrieve a blog by id from the collection.
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id);
    res.send({ status: true, data, message: `Reaching a blog successfully.` });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || `Error retrieving blog`,
    });
  }
};

// Create and save a new Todo to the ddocument.
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title && !req.body.detail) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a blog
  const blog = {
    title: req.body.title,
    detail: req.body.detail,
  };

  // Save multiple blogs in the collection
  // const docs = await User.create([ ]);
  // docs[0] instanceof User; // true
  // docs[0].email; // 'sergey@google.com'
  // docs[1].email; // 'bill@microsoft.com'

  // Save single blog in the collection
  try {
    const data = new Blog(blog);
    await data.save();
    res.send({
      status: true,
      message: "New blog was created successfully.",
    });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || "Some error occurred while creating new blog.",
    });
  }
};

// Update a blog by the id to the collection.
exports.update = async (req, res) => {
  // Validate request
  if (!req.body.title && !req.body.detail) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!",
    });
    return;
  }

  const { id } = req.params;
  const blog = {
    title: req.body.title,
    detail: req.body.detail,
  };
  try {
    const data = await Blog.findById(id);
    Object.assign(data, blog);
    await data.save();
    res.send({
      status: true,
      data,
      message: `Current blog was updated successfully.`,
    });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || `Blog not found`,
    });
  }
};

// Remove a blog by the id to the collection.
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Blog.findById(id);
    await data.remove();
    res.send({
      status: true,
      data,
      message: `Current blog was removed successfully.`,
    });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || `Blog not found`,
    });
  }
};

// Remove all blogs from the collection.
exports.removeAll = async (req, res) => {
  try {
    await data.remove({});
    res.send({
      status: true,
      data,
      message: `All blogs were removed successfully.`,
    });
  } catch (err) {
    res.status(404).send({
      status: false,
      message: err.message || `Some error occurred while retrieving blogs.`,
    });
  }
};
