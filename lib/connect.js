import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const client = new MongoClient(uri);

export default async function ConnectDb() {
  try {
    if (!client.isConnected) {
      await client.connect();
      console.log("Connected to MongoDB"); 
    }
    const db = client.db("creyo");
    const signup = db.collection("signup");
    const otp = db.collection("otp");
    const freelancer = db.collection("freelancer");
    const hire = db.collection("clientpost");
    const Client = db.collection("clientprofile");
    const bid = db.collection("bidders");
    return {
      signup,
      otp,
      freelancer,
      hire,
      Client,
      bid,
    };
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw new Error("Failed to connect to database");
  }
}
