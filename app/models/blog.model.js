module.exports = (Schema, model) => {
  const blogSchema = new Schema(
    {
      title: { type: String, required: true },
      detail: { type: String },
      coverImage: { type: String },
      views: { type: Number },
      lastSeenAt: { type: Date },
      slug: { type: String, slug: "title", unique: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  blogSchema.method("toJSON", function () {
    const obj = this.toObject();
    obj.id = obj._id;
    obj.v = obj.__v;
    delete obj._id;
    delete obj.__v;
    return obj;
  });

  const Blog = model("Blog", blogSchema);
  return Blog;
};
