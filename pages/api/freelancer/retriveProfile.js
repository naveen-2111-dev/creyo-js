// // import ConnectDb from "@/lib/connect";

// // export default async function GET(req, res) {
// //   try {
// //     const collection = await ConnectDb(); // Connect to the database
// //     const users = await collection.signup.find({}).toArray(); // Fetch all users from the 'signup' collection
// //     return res.status(200).json({ users }); // Return the users in the response
// //   } catch (err) {
// //     console.log(err);
// //     return res.status(500).json({ message: "Internal server error." });
// //   }
// // }
// import ConnectDb from "@/lib/connect";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed. Use GET." });
//   }

//   try {
//     const collection = await ConnectDb(); // Connect to the database
//     const users = await collection.freelancer.find({}).toArray(); // Ensure correct collection reference

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found." });
//     }

//     return res.status(200).json(users); // Return the users directly as an array
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// }

// pages/api/freelancer/retriveProfile.js
import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed. Use GET." });
  }

  try {
    // Authenticate user
    await isAuthenticated(req, res, async () => {
      // Access the user ID from the request after authentication
      const userId = req.user._id;

      const collection = await ConnectDb();
      const userProfile = await collection.freelancer.findOne({ createdBy: userId });

      if (!userProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json(userProfile); // Send the user's profile data
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
