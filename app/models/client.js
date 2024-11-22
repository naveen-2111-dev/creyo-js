import mongoose from 'mongoose';

const user = new mongoose.Schema({

  tof:{
    type:[String],
    required: true,
  },
  profile_photo: {
    type: String, 
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  languages: {
    type: [String], 
    required: true,
  },
  current_role: {
    type: String, 
    required: true,
  },
  user_experience: {
    type: Number, 
    required: true,
  },

}, {
  timestamps: true, 
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
