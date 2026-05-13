const bcrypt = require("bcrypt");
const { User } = require("../models");

// GET ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// GET BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { username, email, password, role = "user" } = req.body;

    if (username) user.username = username.trim();
    if (email) user.email = email.trim();
    if (role) user.role = role;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update trip" });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    res.status(501).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};