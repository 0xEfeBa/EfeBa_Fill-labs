import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface User {
  id: number;
  name: string;
  email: string;
}

// Edit User Page: Allows users to modify existing user information
// This page is dynamically routed based on the user ID

export default function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { id } = router.query;

  // Load user data when ID is available in URL
  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  // Retrieve user details from the API
  const fetchUser = async () => {
    try {
      const res = await axios.get<User>(`http://localhost:8080/users/${id}`);
      console.log("AAAAAAAA")
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };        

  // Handle form submission to update user
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${id}`, {
        id: Number(id),
        name,
        email,
      });
      router.push('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Navigate back to user list
  const handleBack = () => {
    router.push('/users');
  };

  return (
    <div className="container">
      <h2 className="title">Edit User</h2>
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
          <button type="submit" className="button-primary">Update</button>
          <button type="button" className="button-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
