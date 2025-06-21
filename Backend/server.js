const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');



dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you’re using cookies or authentication
}));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/posts', require('./routes/socialPosts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/election', require('./routes/electionReportRoutes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
