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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed. Use GET." });
  }

  try {
    await connectDb(); // Ensure the database connection is established
    const users = await Freelancer.find({}).exec(); // Fetch freelancer data

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Log the honourscores individually
    users.forEach(user => console.log("Honour Score:", user.honourscore));

    return res.status(200).json(users); // Return the users directly as an array
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
