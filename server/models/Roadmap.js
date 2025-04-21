const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['video', 'article', 'book', 'course', 'tool'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  skills: {
    type: [String]
  }
});

const MilestoneSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resources: [ResourceSchema],
  projects: [ProjectSchema],
  detailedContent: {
    type: mongoose.Schema.Types.Mixed
  }
});

const StageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timeToComplete: {
    type: String
  },
  milestones: [MilestoneSchema]
});

const RoadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedTimeToComplete: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    default: []
  },
  stages: [StageSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isCustomized: {
    type: Boolean,
    default: false
  },
  originalRoadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
RoadmapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for efficient querying
RoadmapSchema.index({ userId: 1 });
RoadmapSchema.index({ isPublic: 1 });
RoadmapSchema.index({ role: 1, experienceLevel: 1 });

module.exports = mongoose.model('Roadmap', RoadmapSchema);