const bookRouter = require('express').Router()
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
//   incrementViewCount,
} = require("../controllers/book.controller.js");

// Create
bookRouter.post("/", createBook);

// Read
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);

// Update
bookRouter.put("/:id", updateBook);

// Delete
bookRouter.delete("/:id", deleteBook);

// Custom
// bookRouter.patch("/:id/view", incrementViewCount);

module.exports = bookRouter