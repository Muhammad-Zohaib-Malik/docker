import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the User model
const UserModel = mongoose.model('users', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users from MongoDB
    res.json(users); // Respond with JSON data
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(8000, () => {
  console.log('Server is up and running');
});
