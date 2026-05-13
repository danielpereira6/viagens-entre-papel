const loveRouter = require("express").Router();
const { auth } = require("../config/auth");

const {
  getAllLove,
  getLoveById,
  createLove,
  updateLove,
  deleteLove,
} = require("../controllers/love.controller");

loveRouter.get("/", getAllLove);
loveRouter.get("/:id", getLoveById);
loveRouter.post("/", auth, createLove);
loveRouter.put("/:id", auth, updateLove);
loveRouter.delete("/:id", auth, deleteLove);

module.exports = loveRouter;