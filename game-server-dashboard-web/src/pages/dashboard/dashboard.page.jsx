import React, { useState } from 'react';
import DashboardButton from '../../components/dashboardButton/dashboardButton.component';
import './dashboard.styles.css';

const Dashboard = () => {
  const [vmState, setVmState] = useState('Unknown');
  const [publicIP, setPublicIP] = useState('Unknown');
  const apiUrl = `${window['runConfig'].apiUrl}`;
  const apiPort = window['runConfig'].apiPort;
  const apiPath = `${apiUrl}:${apiPort}`;

  const start = () => {
    fetch(`${apiPath}/start`, {
      method: 'put',
      headers: {'content-Type': 'application/json'}
    }).then(response => response.json()).then(response => {
      setVmState(response.StartingInstances[0].CurrentState.Name);
    });
    fetch(`${apiPath}/public-ip`, {
      method: 'get',
      headers: {'content-Type': 'application/json'}
    }).then(response => response.json()).then(response => {
      setPublicIP(response.PublicIP);
    });
  };

  return (
    <div className='dashboard'>
      <DashboardButton text='Start/Refresh' onClick={start} />
      <p>State: {vmState}</p>
      <p>PublicIP: {publicIP}</p>
    </div>
  );
};

export default Dashboard;
