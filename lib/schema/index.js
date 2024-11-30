import mongoose from "mongoose";
const { schema } = mongoose;

const user = new schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
});

const signup = mongoose.model("signup", user);

const OTP = new schema({
  userid: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const otp = mongoose.model("otp", OTP);


const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Define the schema for the user's address
const addressSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
});

// Define the main profile schema
const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workType: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Array of strings
    required: true,
  },
  experience: [experienceSchema], // Array of experience objects
  paymentMethod: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  address: [addressSchema], // Array of address objects
  dateOfBirth: {
    type: Date,
    required: true,
  },
});

const UserProfile = mongoose.models.UserProfile || mongoose.model("UserProfile", userProfileSchema);

module.exports = { signup, otp };
