require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/book.routes.js");

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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
