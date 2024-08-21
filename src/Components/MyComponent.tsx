import React, { useState, useEffect } from 'react';
import {
  login,
  createDevice,
  deleteDevice,
  createDashboard,
  getDashboard,
  getDevices,
  getDashboards,
  getWidgets,
  addWidgetToDashboard,
} from '../api/thingsboardAPI';

const MyComponent: React.FC = () => {
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [dashboardTitle, setDashboardTitle] = useState<string>('');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>('');
  const [widgetData, setWidgetData] = useState<any>({});
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [devices, setDevices] = useState<any[]>([]);
  const [dashboards, setDashboards] = useState<any[]>([]);

  useEffect(() => {
    const dashboards = getDashboards()
    console.log(dashboards)
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };

    const fetchDashboards = async () => {
      try {
        const fetchedDashboards = await getDashboards();
        setDashboards(fetchedDashboards);
      } catch (error) {
        console.error('Error fetching dashboards', error);
      }
    };

    // fetchDevices();
    fetchDashboards();
  }, []);

  const handleLogin = async () => {
    try {
      await login(username, password);
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const handleCreateDevice = async () => {
    try {
      const device = await createDevice(deviceName, deviceType);
      console.log('Device created', device);
      setDevices([...devices, device]);
    } catch (error) {
      console.error('Create device error', error);
    }
  };

  const handleDeleteDevice = async () => {
    try {
      await deleteDevice(selectedDeviceId);
      console.log('Device deleted');
      setDevices(devices.filter(device => device.id !== selectedDeviceId));
    } catch (error) {
      console.error('Delete device error', error);
    }
  };

  const handleCreateDashboard = async () => {
    try {
      const dashboard = await createDashboard(dashboardTitle);
      console.log('Dashboard created', dashboard);
      setDashboards([...dashboards, dashboard]);
    } catch (error) {
      console.error('Create dashboard error', error);
    }
  };

  const handleGetDashboard = async () => {
    try {
      // const dashboard = await getDashboard(selectedDashboardId);
      const dashboards = await getDashboards()
      console.log(dashboards)
      // console.log('Dashboard fetched', dashboard);
    } catch (error) {
      console.error('Get dashboard error', error);
    }
  };

  const handleGetWidgets = async () => {
    try {
      if (selectedDashboardId) {
        const widgets = await getWidgets(selectedDashboardId);
        console.log('Widgets fetched', widgets);
      } else {
        console.error('Dashboard ID is required');
      }
    } catch (error) {
      console.error('Get widgets error', error);
    }
  };

  const handleAddWidgetToDashboard = async () => {
    try {
      if (selectedDashboardId && widgetData) {
        const widget = await addWidgetToDashboard(selectedDashboardId, widgetData);
        console.log('Widget added to dashboard', widget);
      } else {
        console.error('Dashboard ID and widget data are required');
      }
    } catch (error) {
      console.error('Add widget to dashboard error', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Create Device</h2>
        <input
          type="text"
          placeholder="Device Name"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Device Type"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
        />
        <button onClick={handleCreateDevice}>Create Device</button>
      </div>
      <div>
        <h2>Delete Device</h2>
        <select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          <option value="">Select Device</option>
          {devices.map(device => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteDevice}>Delete Device</button>
      </div>
      <div>
        <h2>Create Dashboard</h2>
        <input
          type="text"
          placeholder="Dashboard Title"
          value={dashboardTitle}
          onChange={(e) => setDashboardTitle(e.target.value)}
        />
        <button onClick={handleCreateDashboard}>Create Dashboard</button>
      </div>
      <div>
        <h2>Get Dashboard</h2>
        <select
          value={selectedDashboardId}
          onChange={(e) => setSelectedDashboardId(e.target.value)}
        >
          <option value="">Select Dashboard</option>
          {dashboards.map(dashboard => (
            <option key={dashboard.id} value={dashboard.id}>
              {dashboard.title}
            </option>
          ))}
        </select>
        <button onClick={handleGetDashboard}>Get Dashboard</button>
      </div>
      <div>
        <h2>Get Widgets</h2>
        <select
          value={selectedDashboardId}
          onChange={(e) => setSelectedDashboardId(e.target.value)}
        >
          <option value="">Select Dashboard</option>
          {dashboards.map(dashboard => (
            <option key={dashboard.id} value={dashboard.id}>
              {dashboard.title}
            </option>
          ))}
        </select>
        <button onClick={handleGetWidgets}>Get Widgets</button>
      </div>
      <div>
        <h2>Add Widget to Dashboard</h2>
        <select
          value={selectedDashboardId}
          onChange={(e) => setSelectedDashboardId(e.target.value)}
        >
          <option value="">Select Dashboard</option>
          {dashboards.map(dashboard => (
            <option key={dashboard.id} value={dashboard.id}>
              {dashboard.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Widget Data"
          value={JSON.stringify(widgetData)}
          onChange={(e) => setWidgetData(JSON.parse(e.target.value))}
        />
        <button onClick={handleAddWidgetToDashboard}>Add Widget</button>
      </div>
    </div>
  );
};

export default MyComponent;
