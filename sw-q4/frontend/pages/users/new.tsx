import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// New User Page: Provides form interface for creating new users
// Handles user input and API communication for user creation

export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  // Handle form submission for new user
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/users', {
        name,
        email,
      });
      router.push('/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Navigate back to user list
  const handleBack = () => {
    router.push('/users');
  };

  return (
    <div className="container">
      <h2 className="title">Create New User</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="space-x-2">
          <button type="submit" className="button-primary">Create</button>
          <button type="button" className="button-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
