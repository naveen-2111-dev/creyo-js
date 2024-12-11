import ConnectDb from "@/lib/connect";

export default async function GET(req, res) {
  try {
    const collection = await ConnectDb(); // Connect to the database
    const users = await collection.signup.find({}).toArray(); // Fetch all users from the 'signup' collection
    return res.status(200).json({ users }); // Return the users in the response
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
