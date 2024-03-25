const express = require('express');

const mongoose = require('mongoose');


const app = express();

const PORT = process.env.PORT || 3000;


// Middleware for parsing JSON and urlencoded form data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/socialMediaApi', {

  useNewUrlParser: true,

  useUnifiedTopology: true,

})


.then(() => console.log('Connected to MongoDB'))

.catch(err => console.error('Could not connect to MongoDB...', err));


// Routes

// Example: app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => {

  res.send('Welcome to the Social Media API!');

});


// Start the server

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);


});