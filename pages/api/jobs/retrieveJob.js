
import ConnectDb from "@/lib/connect";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed. Use GET." });
  }

  try {
    const collection = await ConnectDb(); // Connect to the database
    const users = await collection.hire.find({}).toArray(); // Ensure correct collection reference

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json(users); // Return the users directly as an array
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
