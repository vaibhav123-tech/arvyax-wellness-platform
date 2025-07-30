const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { 
    type: String,
    required: true,
    trim: true,
  },
  tags: { 
    type: [String],
    default: [],
  },
  json_file_url: { 
    type: String,
    default: '',
  },
  status: { 
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Session', SessionSchema);