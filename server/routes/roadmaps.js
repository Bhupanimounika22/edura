const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');

// @route   GET /api/roadmaps
// @desc    Get all roadmaps for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (err) {
    console.error('Get roadmaps error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/roadmaps/public
// @desc    Get all public roadmaps
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const publicRoadmaps = await Roadmap.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to prevent too many results
    res.json(publicRoadmaps);
  } catch (err) {
    console.error('Get public roadmaps error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/roadmaps/user
// @desc    Get all roadmaps for the authenticated user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (err) {
    console.error('Get user roadmaps error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/roadmaps/search
// @desc    Search for roadmaps by criteria
// @access  Public
router.post('/search', async (req, res) => {
  try {
    const { role, experienceLevel, searchTerm } = req.body;
    
    // Build query
    const query = { isPublic: true };
    
    if (role) query.role = role;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    
    const roadmaps = await Roadmap.find(query)
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(roadmaps);
  } catch (err) {
    console.error('Search roadmaps error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/roadmaps/:id
// @desc    Get a roadmap by ID
// @access  Public/Private (depends on roadmap visibility)
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    // Check if roadmap is public or belongs to the authenticated user
    if (!roadmap.isPublic) {
      // If not public, check if user is authenticated and is the owner
      const token = req.header('x-auth-token');
      if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this roadmap' });
      }
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (roadmap.userId.toString() !== decoded.userId) {
          return res.status(401).json({ message: 'Not authorized to access this roadmap' });
        }
      } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
    }
    
    res.json(roadmap);
  } catch (err) {
    console.error('Get roadmap error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/roadmaps
// @desc    Create a new roadmap
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // Create new roadmap
    const newRoadmap = new Roadmap({
      ...req.body,
      userId: req.user.id
    });
    
    // Save roadmap
    const roadmap = await newRoadmap.save();
    res.json(roadmap);
  } catch (err) {
    console.error('Create roadmap error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/roadmaps/:id
// @desc    Update a roadmap
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    // Check if user owns the roadmap
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this roadmap' });
    }
    
    // Update roadmap
    roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, updatedAt: Date.now() } },
      { new: true }
    );
    
    res.json(roadmap);
  } catch (err) {
    console.error('Update roadmap error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/roadmaps/:id
// @desc    Delete a roadmap
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    // Check if user owns the roadmap
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this roadmap' });
    }
    
    // Delete roadmap
    await roadmap.remove();
    
    res.json({ message: 'Roadmap removed' });
  } catch (err) {
    console.error('Delete roadmap error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/roadmaps/:id/public
// @desc    Toggle public status of a roadmap
// @access  Private
router.patch('/:id/public', auth, async (req, res) => {
  try {
    const { isPublic } = req.body;
    
    if (typeof isPublic !== 'boolean') {
      return res.status(400).json({ message: 'isPublic must be a boolean' });
    }
    
    let roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    // Check if user owns the roadmap
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this roadmap' });
    }
    
    // Update public status
    roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      { $set: { isPublic, updatedAt: Date.now() } },
      { new: true }
    );
    
    res.json(roadmap);
  } catch (err) {
    console.error('Toggle public status error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;