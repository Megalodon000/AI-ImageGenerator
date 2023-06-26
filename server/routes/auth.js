import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../mongodb/models/user.js';

const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  // Middleware to verify the token
  export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, 'secret-key', (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

// Protected route
router.get('/protected', verifyToken, (req, res) => {
  // Access granted, perform protected actions
  res.json({ message: 'Protected route accessed successfully' });
});
  


export default router;
