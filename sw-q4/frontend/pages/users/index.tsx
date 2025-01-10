import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from './[id]';

// User List Page: Main dashboard for user management
// Displays all users and provides CRUD operation controls

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  // Load all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Retrieve user list from the API
  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>('http://localhost:8080/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Navigate to user creation page
  const handleNew = () => {
    router.push('/users/new');
  };

  // Navigate to user edit page
  const handleEdit = () => {
    if (!selectedUser) {
      alert('Please select a user to edit.');
      return;
    }
    router.push(`/users/${selectedUser.id}`);
  };

  // Remove user from database
  const handleDelete = async () => {
    if (!selectedUser) {
      alert('Please select a user to delete.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/users/${selectedUser.id}`);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">User Management</h1>

      <div className="mb-4 space-x-2">
        <button className="button-primary" onClick={handleNew}>New</button>
        <button className="button-secondary" onClick={handleEdit}>Edit</button>
        <button className="button-danger" onClick={handleDelete}>Delete</button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={selectedUser?.id === user.id ? 'selected' : ''}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
