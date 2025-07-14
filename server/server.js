const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const postRoutes = require('./routes/Post');
const categoryRoutes = require('./routes/Category');
const userRoutes = require('./routes/User');

const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();

// Init app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
