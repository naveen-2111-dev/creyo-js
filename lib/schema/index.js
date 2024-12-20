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
  wallet: {
    walletBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: {
          type: String,
        },
        amount: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: {
          type: String,
        },
      },
    ],
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
  honourscore: {
    type: String,
    required: true,
    default: "100",
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
  wallet: {
    walletBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: {
          type: String,
        },
        amount: {
          type: Number,
          required: true,w
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: {
          type: String,
        },
      },
    ],
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
