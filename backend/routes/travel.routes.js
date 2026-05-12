const router = require("express").Router();
const auth = require("../config/authenticateToken");

const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/travel.controller");

// CRUD
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.post("/", auth, createTrip);
router.put("/:id", auth, updateTrip);
router.delete("/:id", auth, deleteTrip);

module.exports = router;