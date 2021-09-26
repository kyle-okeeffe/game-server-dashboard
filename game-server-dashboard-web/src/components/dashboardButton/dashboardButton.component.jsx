import React from 'react';
import './dashboardButton.styles.css';

const DashboardButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

export default DashboardButton;