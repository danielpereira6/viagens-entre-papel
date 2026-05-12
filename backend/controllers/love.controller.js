const { Love } = require("../models");

// GET ALL
const getAllLove = async (req, res) => {
  try {
    const quotes = await Love.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};

// GET ONE
const getLoveById = async (req, res) => {
  try {
    const quote = await Love.findByPk(req.params.id);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

// CREATE
const createLove = async (req, res) => {
  try {
    const { quote, author, isPublished } = req.body;

    if (!quote) {
      return res.status(400).json({ error: "Quote is required" });
    }

    const newQuote = await Love.create({
      quote: quote.trim(),
      author: author?.trim(),
      isPublished: isPublished ?? true,
    });

    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create quote" });
  }
};

// UPDATE
const updateLove = async (req, res) => {
  try {
    const quote = await Love.findByPk(req.params.id);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    const { quote: text, author, isPublished } = req.body;

    if (text) quote.quote = text.trim();
    if (author !== undefined) quote.author = author?.trim();
    if (isPublished !== undefined) quote.isPublished = isPublished;

    await quote.save();
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update quote" });
  }
};

// DELETE
const deleteLove = async (req, res) => {
  try {
    const quote = await Love.findByPk(req.params.id);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    await quote.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete quote" });
  }
};

module.exports = {
  getAllLove,
  getLoveById,
  createLove,
  updateLove,
  deleteLove,
};