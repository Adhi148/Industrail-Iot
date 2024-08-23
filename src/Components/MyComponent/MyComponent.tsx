import React, { useEffect, useState } from 'react';
import {
  Device,
  Dashboard,
  User,
  DeviceQueryParams,
  PageData,
  DashboardQueryParams,
} from '../../types/thingsboardTypes';
import { login, logout } from '../../api/loginApi';
import { getTenantDevices, saveDevice } from '../../api/deviceApi';
import { getTenantDashboards, saveDashboard } from '../../api/dashboardApi';
import { getUsers, saveUser } from '../../api/userApi';
import {
  getAllWidgetsBundles,
  getWidgetsBundles,
} from '../../api/widgetsBundleAPI';
import { resolvePath } from 'react-router-dom';

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

  // State for user creation
  const [newUsername, setNewUsername] = useState<string>('');
  const [sendActivationMail, setSendActivationMail] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  // State for devices
  const [devices, setDevices] = useState<Device[]>([]);
  const [loadingDevices, setLoadingDevices] = useState<boolean>(false);

  // State for dashboards
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loadingDashboards, setLoadingDashboards] = useState<boolean>(false);

  // State for users
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  // State for widget bundles
  const [widgetBundles, setWidgetBundles] = useState<any[]>([]);
  const [loadingWidgetBundles, setLoadingWidgetBundles] =
    useState<boolean>(false);
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const [totalWidgetPages, setTotalWidgetPages] = useState<number>(0);

  // Fetch widget bundles with parameters
  const fetchAllWidgetBundles = async () => {
    try {
      setLoadingWidgetBundles(true);
      setWidgetBundles(response || []);
    } catch (error) {
      console.error('Failed to fetch widget bundles', error);
    } finally {
      setLoadingWidgetBundles(false);
    }
  };

  // Fetch widget bundles with parameters
  const fetchWidgetBundles = async (page: number) => {
    try {
      setLoadingWidgetBundles(true);
      const response = await getWidgetsBundles(10, page);
      setWidgetBundles(response.data || []);
      setTotalWidgetPages(response.totalPages | 0);
    } catch (error) {
      console.error('Failed to fetch widget bundles', error);
    } finally {
      setLoadingWidgetBundles(false);
    }
  };

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
      fetchDevices(0); // Optionally refetch devices
    } catch (error) {
      setDeviceError('Failed to create device');
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
      fetchDashboards(0); // Optionally refetch dashboards
    } catch (error) {
      setDashboardError('Failed to create dashboard');
    }
  };

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const newUser: User = {
        "email": "user@example.com",
        "authority": "SYS_ADMIN, TENANT_ADMIN or CUSTOMER_USER",
      }
      await saveUser(newUser, sendActivationMail);
      setNewUsername('');
      alert('User created successfully!');
      fetchUsers(0); // Optionally refetch users
    } catch (error) {
      setUserError('Failed to create user');
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

      const response: PageData<Device> = await getTenantDevices(params);
      setDevices(response.data);
    } catch (error) {
      console.error('Failed to fetch devices', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  // Fetch dashboards
  const fetchDashboards = async (page: number) => {
    try {
      setLoadingDashboards(true);

      const params: DashboardQueryParams = {
        pageSize: 10, // Adjust as needed
        page: page,
        textSearch: '', // Adjust as needed or remove if not searching
        sortProperty: 'title', // Adjust as needed or remove if not sorting
        sortOrder: 'ASC', // Adjust as needed or remove if not sorting
      };

      const response: PageData<Dashboard> = await getTenantDashboards(params);

      setDashboards(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboards', error);
    } finally {
      setLoadingDashboards(false);
    }
  };

  // Fetch users
  const fetchUsers = async (page: number) => {
    try {
      setLoadingUsers(true);
      const response: PageData<User> = await getUsers(page);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setUserError('Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleGetAll = () => {
    fetchDevices(0);
    fetchDashboards(0);
    fetchUsers(0);
    fetchAllWidgetBundles(0);
  };

  const handlePageChangeWidgets = (page: number) => {
    setCurrentWidgetPage(page < totalWidgetPages ? page : totalWidgetPages);
  };

  useEffect(() => {
    fetchDevices(0);
    fetchDashboards(0);
    fetchUsers(0);
    fetchAllWidgetBundles(); // Fetch widget bundles on component mount
    fetchWidgetBundles(currentWidgetPage);
  }, []);

  useEffect(() => {
    fetchWidgetBundles(currentWidgetPage);
  }, [currentWidgetPage]);

  return (
    <div className="menu-data" style={{ padding: '10px' }}>
      <h1>MyComponent</h1>
      <button onClick={handleGetAll}>Get Data</button>

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

      {/* Create User */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Username"
        />
        <label>
          <input
            type="checkbox"
            checked={sendActivationMail}
            onChange={(e) => setSendActivationMail(e.target.checked)}
          />
          Send Activation Mail
        </label>
        <button onClick={handleCreateUser}>Create User</button>
        {userError && <p>{userError}</p>}
      </div>

      {/* Devices List */}
      <div>
        <h2>Devices</h2>
        {loadingDevices ? (
          <p>Loading devices...</p>
        ) : (
          <ul>
            {devices.map((device, index) => (
              <li key={index}>{device.name}</li>
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
            {dashboards.map((dashboard, index) => (
              <li key={index}>{dashboard.title}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Users List */}
      <div>
        <h2>Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name}({user.authority})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Widget Bundles List */}
      <div>
        <h2>Widget Bundles</h2>
        {loadingWidgetBundles ? (
          <p>Loading widget bundles...</p>
        ) : (
          <ul>
            {widgetBundles.map((bundle) => (
              <li key={bundle.id.id}>{bundle.name}</li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        <button
          onClick={() => handlePageChangeWidgets(currentWidgetPage - 1)}
          disabled={currentWidgetPage <= 0}
        >
          Previous
        </button>
        <span>
          {currentWidgetPage + 1} / {totalWidgetPages}
        </span>
        <button
          onClick={() => handlePageChangeWidgets(currentWidgetPage + 1)}
          disabled={currentWidgetPage >= totalWidgetPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
