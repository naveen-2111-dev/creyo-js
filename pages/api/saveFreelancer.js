export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Log the incoming request body for debugging
      console.log(req.body);

      // Your database logic here

      // Example: Create a new freelancer profile from the request data
      const { name, description, workType, skills, experience, paymentMethod, language, address, dateOfBirth } = req.body;

      // Assuming the schema and save method works as expected
      const newFreelancer = new Freelancer({
        name,
        description,
        workType,
        skills,
        experience,
        paymentMethod,
        language,
        address,
        dateOfBirth,
      });

      // Save the freelancer profile to the database
      await newFreelancer.save();

      // Send success response
      return res.status(201).json({ message: 'Freelancer profile saved successfully!' });
    } catch (error) {
      console.error('Error saving freelancer data:', error);
      return res.status(500).json({ message: 'Failed to save freelancer profile.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
