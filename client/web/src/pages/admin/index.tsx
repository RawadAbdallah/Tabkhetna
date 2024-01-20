// src/App.tsx
import './admin.css'

import React from 'react';
import FAQSection from './FAQSection';
import CircularBar from './CircularBar';
import LiveEventsSection from './LiveEventsSection';
import UserFeed from './UserFeed';



const mockUsers = [
  { firstname: 'John', lastname: 'Doe', email: 'john@example.com', country: 'USA', gender: 'Male' },
  // Add more users as needed
];

const AdminPage: React.FC = () => {
  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <div className="section">
        <FAQSection />
      </div>
      <div className="section">
        <LiveEventsSection />
      </div>
      <div className="section circular-bar-container">
        <CircularBar malePercentage={40} femalePercentage={60} />
      </div>
      <div className="section user-feed-container">
        <UserFeed users={mockUsers} />
      </div>
    </div>
  );
};

export default AdminPage;
