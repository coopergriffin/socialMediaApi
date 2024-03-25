//Cooper Griffin 
//March 25th 2024 

const express = require('express');
const mongoose = require('mongoose');

// Import routes
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
// Add any additional route imports here

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmediaapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// Add any additional routes here

// Start server with clickable link
app.listen(PORT, () => console.log(`🌍 Server running at http://localhost:${PORT}`));