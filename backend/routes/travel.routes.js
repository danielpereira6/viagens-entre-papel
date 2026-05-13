const travelRouter = require("express").Router();
const { auth } = require("../config/auth");

const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/travel.controller");

// CRUD
travelRouter.get("/", getAllTrips);
travelRouter.get("/:id", getTripById);
travelRouter.post("/", auth, createTrip);
travelRouter.put("/:id", auth, updateTrip);
travelRouter.delete("/:id", auth, deleteTrip);

module.exports = travelRouter;