import React, { useState, useEffect } from 'react';

import { Device, Dashboard } from '../../types/thingsboardTypes';
import { login, logout } from '../../api/loginApi';
import { generateDeviceId, getAllDevices, getCustomerDevices, saveDevice } from '../../api/deviceApi';
import { getCustomerDashboards } from '../../api/dashboardApi';

const MyComponent: React.FC = () => {
  // State for login
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // State for device creation
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceError, setDeviceError] = useState<string | null>(null);

  // State for device and dashboard lists
  const [devices, setDevices] = useState<Device[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loadingDevices, setLoadingDevices] = useState<boolean>(true);
  const [loadingDashboards, setLoadingDashboards] = useState<boolean>(true);



  // Handle login
  const handleLogin = async () => {
    try {
      await login(username, password);
      alert('Login successful!');
      setLoginError(null);
      // fetchDevices();
      // fetchDashboards();
    } catch (error) {
      setLoginError('Login failed');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    alert('Logout successful!');
  };

  // Handle device creation
  const handleCreateDevice = async () => {
    try {
      const newDevice: Device = { 
        name: deviceName, 
        type: deviceType };
      await saveDevice(newDevice);
      setDeviceName('');
      setDeviceType('');
      alert('Device created successfully!');
      fetchDevices();
    } catch (error) {
      setDeviceError('Failed to create device');
    }
  };

  // Fetch devices
  const fetchDevices = async () => {
    try {
      setLoadingDevices(true);
      const data = await getAllDevices("SELECT * FROM device;");
      setDevices(data);
    } catch (error) {
      console.error('Failed to fetch devices', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  // Fetch dashboards
  const fetchDashboards = async () => {
    try {
      setLoadingDashboards(true);
      const data = await getCustomerDashboards(customerId);
      setDashboards(data);
    } catch (error) {
      console.error('Failed to fetch dashboards', error);
    } finally {
      setLoadingDashboards(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    // fetchDashboards();
  }, []);

  return (
    <div  className="menu-data">
      <h1>MyComponent</h1>

      {/* Login Form */}
      <div>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        {loginError && <p>{loginError}</p>}
      </div>

      {/* Create Device */}
      <div>
        <h2>Create Device</h2>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="Device Name"
        />
        <input
          type="text"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          placeholder="Device Type"
        />
        <button onClick={handleCreateDevice}>Create Device</button>
        {deviceError && <p>{deviceError}</p>}
      </div>

      {/* Devices List */}
      <div>
        <h2>Devices</h2>
        {loadingDevices ? (
          <p>Loading devices...</p>
        ) : (
          <ul>
            {devices.map((device) => (
              <li key={device.id}>{device.name} ({device.type})</li>
            ))}
          </ul>
        )}
      </div>

      {/* Dashboards List */}
      <div>
        <h2>Dashboards</h2>
        {loadingDashboards ? (
          <p>Loading dashboards...</p>
        ) : (
          <ul>
            {dashboards.map((dashboard) => (
              <li key={dashboard.id}>{dashboard.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
