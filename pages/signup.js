// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !email || !password || !country) {
      setError('All fields are required.');
      return;
    }

    // If validation passes, you can add signup logic or API calls here
    console.log({ firstName, lastName, email, password, country });

    // Redirect to the home page or login page after successful signup
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="country" style={styles.label}>Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
  },
  formContainer: {
    width: '500px', // Made it slightly wider
    padding: '0rem 4rem 5rem 4rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)', // Glass effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Light border to enhance the glass effect
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#444',
    border: '1px solid #555',
    borderRadius: '4px',
    color: 'white',
    fontSize: '1rem',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
    