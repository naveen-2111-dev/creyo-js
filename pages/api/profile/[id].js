// import ConnectDb from '@/lib/connect';
// import User from '@/lib/schema/'; // Adjust import based on your project structure
import { ObjectId } from "mongodb";
import ConnectDb from "@/lib/connect";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const db = await ConnectDb();
            const user = await db.signup.findOne({_id : new ObjectId(id)});
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Server error', message: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
