import Head from 'next/head';
import NavBar from '../components/NavBar'; // Optional if you have a NavBar component
import 'tailwindcss/tailwind.css'

const StartWork = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar /> {/* Optional, if you have a NavBar */}

    </div>
  );
};

export default StartWork;
