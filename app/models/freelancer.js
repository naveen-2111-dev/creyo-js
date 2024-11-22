import mongoose from 'mongoose';

// Define the freelancer-specific schema
const freelancer = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (for common data like skills, role)
    required: true,
  },
  skills: {
    type: [String], // List of skills the user possesses
    required: true,
  },
  current_role: {
    type: String, // Current role of the user (e.g., 'Software Developer')
    required: true,
  },
  resume: {
    type: String, // URL or file path to the resume
    required: true,
  },
  profile_photo: {
    type: String, // URL to the profile photo
    required: true,
  },
  bio: {
    type: String, // Short biography of the freelancer
    required: true,
  },
  languages: {
    type: [String], // List of languages the freelancer speaks
    required: true,
  },
  experiences: [
    {
      title: {
        type: String, // Job title or position
        required: true,
      },
      company: {
        type: String, // Company or project name
        required: true,
      },
      duration: {
        type: String, // Duration of the job or project (e.g., '2 years', '6 months')
        required: true,
      },
      description: {
        type: String, // Description of the work done in the job or project
        required: true,
      },
      rating: {
        type: String,
        required: true,
      }
    }
  ],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Freelancer model based on the schema
const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', freelancerSchema);

export default Freelancer;
