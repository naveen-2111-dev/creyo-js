
import ConnectDb from "@/lib/connect";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed. Use GET." });
  }

  try {
    await connectDb(); // Ensure the database connection is established
    const users = await Freelancer.find({}, { honourscore: 1, name: 1 }).exec(); // Fetch only honourscore and name

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Log the honourscores individually
    users.forEach(user => console.log("Honour Score:", user.honourscore));

    const honourScores = users.map(user => ({
      name: user.name,
      honourscore: user.honourscore
    }));

    return res.status(200).json({ honourScores }); // Return only the honour scores
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
