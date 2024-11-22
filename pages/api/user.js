import ConnectDb from "@/lib/connect";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { firstname, lastname, email, password, country } = req.body;
    if (!firstname || !lastname || !email || !password || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const signupCollection = await ConnectDb();

    const existingUser = await signupCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      country,
      createdAt: new Date(),
    };

    await signupCollection.insertOne(newUser);

    return res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
