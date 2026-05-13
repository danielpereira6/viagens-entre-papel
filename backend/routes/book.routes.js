const bookRouter = require('express').Router();
const { auth } = require("../config/auth");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  // incrementViewCount,
} = require("../controllers/book.controller.js");

// Create
bookRouter.post("/", auth, createBook);

// Read
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);

// Update
bookRouter.put("/:id", auth, updateBook);

// Delete
bookRouter.delete("/:id", auth, deleteBook);

// Custom
// bookRouter.patch("/:id/view", incrementViewCount);

module.exports = bookRouter