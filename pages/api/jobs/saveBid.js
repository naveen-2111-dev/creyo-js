import ConnectDb from '@/lib/connect';
// import Bid from '@/lib/models/Bid'; // Import the Bid model
import { Bid } from '@/lib/models';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { roomId, freelancerName, bidAmount, milestone, whyEligible } = req.body;

      // Ensure all required fields are provided
      if (!roomId || !freelancerName || !bidAmount || !milestone || !whyEligible) {
        return res.status(400).json({
          message: 'All fields are required to place a bid',
        });
      }

      // Connect to the database
      await ConnectDb();

      // Create a new bid document using the Mongoose model
      const newBid = new Bid({
        roomId,
        freelancerName,
        bidAmount,
        milestone,
        whyEligible,
      });

      // Save the bid document to the database
      const result = await newBid.save();

      return res.status(201).json({
        message: 'Bid saved successfully',
        bidId: result._id, // Return the inserted bid ID
      });
    } catch (error) {
      // Log the error for debugging and send back the error message
      console.error('Error saving the bid:', error);
      return res.status(500).json({
        message: 'Error saving the bid',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  }
}
