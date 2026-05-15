const { Love } = require("../models");

// GET ALL
const getAllLove = async (req, res) => {
  try {
    const posts = await Love.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// GET ONE
const getLoveById = async (req, res) => {
  try {
    const post = await Love.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// CREATE
const createLove = async (req, res) => {
  try {
    const { content, title, author, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content is required" });
    }
    
    const newPost = await Love.create({
      title: title,
      content: content,
      author: author,
      isPublished: isPublished ?? false,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to create post" });
  }
};

// UPDATE
const updateLove = async (req, res) => {
  try {
    const post = await Love.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { content, title, author, isPublished } = req.body;

    if (title) post.title = title.trim();
    if (content) post.content = content.trim();
    if (author !== undefined) post.author = author?.trim();
    if (isPublished !== undefined) post.isPublished = isPublished;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// DELETE
const deleteLove = async (req, res) => {
  try {
    const post = await Love.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  getAllLove,
  getLoveById,
  createLove,
  updateLove,
  deleteLove,
};