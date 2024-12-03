require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
console.log('MONGO_URI :', process.env.MONGO_URI);
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://saikumar:mongoqwerty@cluster0.y58qt.mongodb.net/quickserve?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    retryWrites: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
