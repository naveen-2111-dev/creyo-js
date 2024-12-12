import connectDb from "@/lib/connect";
import mongoose from "mongoose";

// Ensure the Freelancer model is defined
const freelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pronounciation: {
    type: String,
    required: true,
  },
  experience: {
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
        location: {
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
      hsc: {
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
  rating: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  honourscore: {
    type: String,
    required: true,
    default: "100",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
});

const Freelancer = mongoose.models.freelancer || mongoose.model("freelancer", freelancerSchema);

const PostJob = new Schema({
  title: {
    type: String,
    required: true,
  },
  skill: [
    {
      type: String,
      required: true,
    },
  ],
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
  proposers: [
    {
      type: String,
      required: true,
    },
  ],
  rating: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "signup",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  personalpost: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
});

const Post = mongoose.model("clientpost", PostJob);

const JoinJob = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "clientpost",
    required: true,
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  proposer: {
    type: String,
    required: true,
  },
});

const join = mongoose.model("bidders", JoinJob);

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
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "clientpost",
    },
  ],

  notification: [
    {
      type: String,
      required: true,
    },
  ],
  payment: {
    type: Boolean,
    required: true,
  },
  rating: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "signup",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  workhistory: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const hirer = mongoose.model("clientprofile", client);

//report or other periperals database

const Report = new Schema({
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
  reportedId: {
    type: Schema.Types.ObjectId,
    ref: "signup",
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "clientpost",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const flag = mongoose.model("flaged", Report);

module.exports = {
  signup,
  otp,
  Lancer,
  Post,
  hirer,
  join,
  flag,
};
