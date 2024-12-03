import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["freelancer", "hiringClient"],
    required: true,
  },
  freelancerProfile: {
    type: Schema.Types.ObjectId,
    ref: "freelancer",
  },
  hiringClientProfile: {
    type: Schema.Types.ObjectId,
    ref: "hiringClient",
  },
});

const signup = mongoose.model("signup", userSchema);

const otpSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const otp = mongoose.model("otp", otpSchema);

const freelancerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pronounciation: {
    type: String,
    required: true,
  },
  exprience: {
    type: String,
    enum: ["new", "intermediate", "expert"],
    required: true,
  },
  goal: {
    type: String,
    enum: ["earn", "experience", "sideincome"],
    required: true,
  },
  tellAbout: {
    type: String,
    required: true,
  },
  manual: {
    fieldOfWork: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    experience: [
      {
        placeofWork: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        Location: {
          type: String,
          required: true,
        },
        start: {
          type: Date,
          required: true,
        },
        present: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    education: {
      sslc: {
        type: String,
        required: true,
      },
      Hsc: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
    },
    language: [
      {
        type: String,
        required: true,
      },
    ],
    bio: {
      link: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    payment: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      dno: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
});

const Lancer = mongoose.model("freelancer", freelancerSchema);

const PostJob = new Schema({
  title: {
    type: String,
    required: true,
  },
  skill: {
    type: [String],
    required: true,
  },
  scope: {
    type: String,
    enum: ["large", "intermediate", "small"],
    required: true,
  },
  month: {
    type: Date,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  workTime: {
    type: String,
    enum: ["fulltime", "parttime"],
    required: true,
  },
  budget: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  charge: {
    type: String,
    enum: ["hour", "fixed"],
    required: true,
  },
  description: {
    link: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
});

const Post = mongoose.model("hiringClient", PostJob);

const client = new Schema({
  company: {
    type: String,
    required: true,
  },
  typeofcompany: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  notification: [
    {
      type: String,
      required: true,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const hirer = mongoose.model("hireProfile", client);

module.exports = {
  signup,
  otp,
  Lancer,
  Post,
  hirer,
};
