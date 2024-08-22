import React, { useEffect, useState } from 'react';
import {
  Device,
  Dashboard,
  DeviceQueryParams,
  PageData
} from '../../types/thingsboardTypes';
import { login, logout } from '../../api/loginApi';
import { getTenantDevices, saveDevice } from '../../api/deviceApi';
import { saveDashboard } from '../../api/dashboardApi';

const MyComponent: React.FC = () => {
  // State for login
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // State for device creation
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceError, setDeviceError] = useState<string | null>(null);

  // State for dashboard creation
  const [dashboardTitle, setDashboardTitle] = useState<string>('');
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // State for devices
  const [devices, setDevices] = useState<Device[]>([]);
  const [loadingDevices, setLoadingDevices] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Handle login
  const handleLogin = async () => {
    try {
      await login(username, password);
      alert('Login successful!');
      setLoginError(null);
    } catch (error: any) {
      setLoginError(error.message || 'Login failed');
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
        type: deviceType,
      };
      await saveDevice(newDevice);
      setDeviceName('');
      setDeviceType('');
      alert('Device created successfully!');
      fetchDevices(1); // Optionally refetch devices
    } catch (error: any) {
      setDeviceError(error.message || 'Failed to create device');
    }
  };

  // Handle dashboard creation
  const handleCreateDashboard = async () => {
    try {
      const newDashboard: Dashboard = {
        title: dashboardTitle,
      };
      await saveDashboard(newDashboard);
      setDashboardTitle('');
      alert('Dashboard created successfully!');
    } catch (error: any) {
      setDashboardError(error.message || 'Failed to create dashboard');
    }
  };

  // Fetch devices
  const fetchDevices = async (page: number) => {
    try {
      setLoadingDevices(true);

      const params: DeviceQueryParams = {
        pageSize: 10,
        page: page,
        type: 'default',
        textSearch: '',
        sortProperty: 'name',
        sortOrder: 'ASC',
      };

      const data: PageData<Device> = await getTenantDevices(params);
      setDevices(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch devices', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  useEffect(() => {
    fetchDevices(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="menu-data">
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

      {/* Create Dashboard */}
      <div>
        <h2>Create Dashboard</h2>
        <input
          type="text"
          value={dashboardTitle}
          onChange={(e) => setDashboardTitle(e.target.value)}
          placeholder="Dashboard Title"
        />
        <button onClick={handleCreateDashboard}>Create Dashboard</button>
        {dashboardError && <p>{dashboardError}</p>}
      </div>

      {/* Devices List */}
      <div>
        <h2>Devices</h2>
        {loadingDevices ? (
          <p>Loading devices...</p>
        ) : (
          <>
            <ul>
              {devices.map((device, index) => (
                <li key={index}>
                  {device.name} ({device.type})
                </li>
              ))}
            </ul>
            <div>
              <button
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
