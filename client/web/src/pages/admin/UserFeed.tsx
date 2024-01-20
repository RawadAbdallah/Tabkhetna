import React, { useState } from 'react';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;
}

interface UserFeedProps {
  users: User[];
}

const UserFeed: React.FC<UserFeedProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Users Section</h2>
      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.map((user, index) => (
        <div key={index}>
          <p>{`${user.firstname} ${user.lastname} - ${user.email} - ${user.country} - ${user.gender}`}</p>
        </div>
      ))}
    </div>
  );
};

export default UserFeed;