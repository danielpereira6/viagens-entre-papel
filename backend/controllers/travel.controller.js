const { Trip } = require("../models");

// GET ALL
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

// GET ONE
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    if (!trip.isPublished && !req.admin) {
      return res.status(403).json({ error: "Not published" });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};

// CREATE
const createTrip = async (req, res) => {
  try {
    const { title, location, description, photos, isPublished } = req.body;

    if (!title || !location) {
      return res.status(400).json({
        error: "Missing title or location",
      });
    }

    const trip = await Trip.create({
      title: title.trim(),
      location: location.trim(),
      description: description?.trim(),
      photos,
      isPublished: isPublished ?? true,
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to create trip" });
  }
};

// UPDATE
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const { title, location, description, photos, isPublished } = req.body;

    if (title) trip.title = title.trim();
    if (location) trip.location = location.trim();
    if (description !== undefined) trip.description = description?.trim();
    if (photos) trip.photos = photos;
    if (isPublished !== undefined) trip.isPublished = isPublished;

    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to update trip" });
  }
};

// DELETE
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    await trip.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete trip" });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};