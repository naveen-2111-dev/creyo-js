import ConnectDb from "@/lib/connect";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const { Firstname, Lastname, Email, Password, Country } = req.body;

  if (!Firstname || !Lastname || !Email || !Password || !Country) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const collection = await ConnectDb();
    const existingUser = await collection.findOne({ email: Email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const newUser = {
      firstname: Firstname,
      lastname: Lastname,
      email: Email,
      password: hashedPassword,
      country: Country,
    };

    await collection.insertOne(newUser);
    return res.status(201).json({ message: "User successfully created." });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
