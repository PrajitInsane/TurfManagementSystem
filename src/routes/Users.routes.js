const express= require('express');
const router= express.Router();
const {createUser,findAllUsers,findOneUser,updateUser,deleteUser}= require('../controllers/Users.controllers');
const User= require('../models/Users.model');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');

router.get('/',findAllUsers);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const user = new User({ name, email, password });
      await user.save();
  
      const token = jwt.sign({ id: user._id }, '12345', { expiresIn:'1h'});
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id },'12345', { expiresIn:'1h' });
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });

  const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const verified = jwt.verify(token,'12345');
      req.user = verified; // Attach user data to request object
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };

  router.get('/profile', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  });
  

module.exports= router;