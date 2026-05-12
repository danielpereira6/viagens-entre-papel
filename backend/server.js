require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/book.routes");
const travelRoutes = require("./routes/travel.routes");
const loveRoutes = require("./routes/love.routes");

const app = express();

// configure CORS
app.use(
    cors({
        origin: true,
        // credentials: true,
    })
)

// Middleware
app.use(express.json({ limit: '50mb' })); // Allow large base64 images
app.use(express.urlencoded({ limit: '50mb' }));

// Routes
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/trip", travelRoutes);
app.use("/love", loveRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Token generate
app.get("/generate-token", (req, res) => {
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  res.json({ token });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize database and start server
const startServer = async () => {
  await sequelize.authenticate();
  await sequelize.sync(); // dev only
  // await createDefaultAdmin();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
startServer();
