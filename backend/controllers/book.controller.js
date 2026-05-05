const { Book } = require("../models");

// GET all published books with pagination and filtering
const getAllBooks2 = async (req, res) => {
  try {
    const { page = 1, limit = -1, offset } = req.body;
    const { category, minRating, search, sortBy } = req.query;

    // Build where clause for filtering
    const where = { isPublished: true };

    if (category && typeof category === 'string') {
      where.category = category;
    }

    if (minRating && !isNaN(Number(minRating))) {
      where.rating = { [Op.gte]: parseInt(minRating) };
    }

    if (search && typeof search === 'string') {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
      ];
    }

    // Determine sort order
    let order = [['createdAt', 'DESC']];
    if (sortBy === 'rating') {
      order = [['rating', 'DESC']];
    } else if (sortBy === 'views') {
      order = [['viewCount', 'DESC']];
    } else if (sortBy === 'title') {
      order = [['title', 'ASC']];
    }

    const { count, rows } = await Book.findAndCountAll({
      where,
      attributes: { exclude: ['coverImage'] }, // Don't load large images in list
      order,
      limit,
      offset,
    });

    const response = { status: 200, data: { rows, count, page, limit } };
    res.json(response);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// GET ALL (with optional category filter)
const getAllBooks = async (req, res) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category) {
      where.category = category;
    }

    const books = await Book.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    res.json(books);
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// GET single book by ID (increments view count)
const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    if (!book.isPublished && !req.admin) {
      res.status(403).json({ error: 'Book not published' });
      return;
    }

    // Increment view count
    await book.increment('viewCount');

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// CREATE book (admin only)
const createBook = async (req, res) => {
  try {
    const { title, author, category, rating, opinion, coverImage, isPublished } = req.body;

    // Validation
    if (!title || !author || !category || !rating) {
      res.status(400).json({
        error: 'Missing required fields: title, author, category, rating',
        required: ['title', 'author', 'category', 'rating']
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5' });
      return;
    }

    if (title.length < 1 || title.length > 255) {
      res.status(400).json({ error: 'Title must be between 1 and 255 characters' });
      return;
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      rating: parseInt(rating),
      opinion: opinion?.trim(),
      coverImage,
      isPublished: isPublished !== undefined ? isPublished : true,
      viewCount: 0,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// UPDATE book (admin only)
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    const { title, author, category, rating, opinion, coverImage, isPublished } = req.body;

    // Validate if rating is provided
    if (rating && (rating < 1 || rating > 5)) {
      res.status(400).json({ error: 'Rating must be between 1 and 5' });
      return;
    }

    if (title) book.title = title.trim();
    if (author) book.author = author.trim();
    if (category) book.category = category.trim();
    if (rating) book.rating = rating;
    if (opinion !== undefined) book.opinion = opinion?.trim();
    if (coverImage) book.coverImage = coverImage;
    if (isPublished !== undefined) book.isPublished = isPublished;

    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE book (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    await book.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// GET books by category
const getCategories = async (req, res) => {
  try {
    const categories = await Book.findAll({
      where: { isPublished: true },
      attributes: ['category'],
      raw: true,
      group: ['category'],
      subQuery: false,
    });

    const uniqueCategories = [...new Set(categories.map(b => b.category))].sort();
    res.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getCategories
}