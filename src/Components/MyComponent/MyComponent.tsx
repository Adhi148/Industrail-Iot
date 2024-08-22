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
import { getAllWidgetsBundles, getWidgetsBundles } from '../../api/widgetsBundleAPI';

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
  const [newPassword, setNewPassword] = useState<string>('');
  const [sendActivationMail, setSendActivationMail] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  // State for devices
  const [devices, setDevices] = useState<Device[]>([]);
  const [loadingDevices, setLoadingDevices] = useState<boolean>(false);
  const [currentPageDevices, setCurrentPageDevices] = useState<number>(0);
  const [totalPagesDevices, setTotalPagesDevices] = useState<number>(0);

  // State for dashboards
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loadingDashboards, setLoadingDashboards] = useState<boolean>(false);
  const [currentPageDashboards, setCurrentPageDashboards] = useState<number>(0);
  const [totalPagesDashboards, setTotalPagesDashboards] = useState<number>(0);

  // State for users
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [currentPageUsers, setCurrentPageUsers] = useState<number>(0);
  const [totalPagesUsers, setTotalPagesUsers] = useState<number>(0);

  // State for widget bundles
  const [widgetBundles, setWidgetBundles] = useState<any[]>([]);
  const [loadingWidgetBundles, setLoadingWidgetBundles] =
    useState<boolean>(false);
  const [currentPageWidgetBundles, setCurrentPageWidgetBundles] =
    useState<number>(0);
  const [totalPagesWidgetBundles, setTotalPagesWidgetBundles] =
    useState<number>(0);

  // Fetch widget bundles with parameters
  const fetchWidgetBundles = async (page: number) => {
    try {
      setLoadingWidgetBundles(true);

      const bundles = await getAllWidgetsBundles();
      // const bundleswithpage = await getWidgetsBundles(10, 0, 'searchText', 'name', 'ASC', true, false);
      console.log(bundles)
      setWidgetBundles(bundles || []);
      // setTotalPagesWidgetBundles(bundles.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch widget bundles', error);
    } finally {
      setLoadingWidgetBundles(false);
    }
  };


  useEffect(() => {
    fetchDevices(currentPageDevices);
    fetchDashboards(currentPageDashboards);
    fetchUsers(currentPageUsers);
    fetchWidgetBundles(currentPageWidgetBundles); // Fetch widget bundles on component mount
  }, [
    currentPageDevices,
    currentPageDashboards,
    currentPageUsers,
    currentPageWidgetBundles,
  ]);

  // Handle pagination for widget bundles
  const handlePageChangeWidgetBundles = (page: number) => {
    setCurrentPageWidgetBundles(page);
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
      fetchDevices(currentPageDevices); // Optionally refetch devices
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
      fetchDashboards(currentPageDashboards); // Optionally refetch dashboards
    } catch (error) {
      setDashboardError('Failed to create dashboard');
    }
  };

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const newUser: User = {
        username: newUsername,
        password: newPassword,
        // Add other required fields here
      };
      await saveUser(newUser, sendActivationMail);
      setNewUsername('');
      setNewPassword('');
      alert('User created successfully!');
      fetchUsers(currentPageUsers); // Optionally refetch users
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

      const data: PageData<Device> = await getTenantDevices(params);
      setDevices(data.data);
      setTotalPagesDevices(data.totalPages);
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

      const data: PageData<Dashboard> = await getTenantDashboards(params);
      setDashboards(data.data);
      setTotalPagesDashboards(data.totalPages);
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
      setTotalPagesUsers(response.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setUserError('Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchDevices(currentPageDevices);
  }, [currentPageDevices]);

  useEffect(() => {
    fetchDashboards(currentPageDashboards);
  }, [currentPageDashboards]);

  useEffect(() => {
    fetchUsers(currentPageUsers);
  }, [currentPageUsers]);

  const handlePageChangeDevices = (page: number) => {
    setCurrentPageDevices(page);
  };

  const handlePageChangeDashboards = (page: number) => {
    setCurrentPageDashboards(page);
  };

  const handlePageChangeUsers = (page: number) => {
    setCurrentPageUsers(page);
  };

  const handleGetAll = () => {
    fetchDevices(currentPageDevices);
    fetchDashboards(currentPageDashboards);
    fetchUsers(currentPageUsers);
    fetchWidgetBundles(currentPageWidgetBundles);

    console.log(devices)
    console.log(dashboards)
    console.log(users)
    console.log(widgetBundles)
  }

  return (
    <div className="menu-data" style={{padding: "10px"}}>
      <h1>MyComponent</h1>
      <button onClick={handleGetAll} >Get Data</button>

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
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password"
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
        {/* Pagination */}
        <button
          onClick={() => handlePageChangeDevices(currentPageDevices - 1)}
          disabled={currentPageDevices <= 0}
        >
          Previous
        </button>
        <span>
          {currentPageDevices + 1} / {totalPagesDevices}
        </span>
        <button
          onClick={() => handlePageChangeDevices(currentPageDevices + 1)}
          disabled={currentPageDevices >= totalPagesDevices - 1}
        >
          Next
        </button>
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
        {/* Pagination */}
        <button
          onClick={() => handlePageChangeDashboards(currentPageDashboards - 1)}
          disabled={currentPageDashboards <= 0}
        >
          Previous
        </button>
        <span>
          {currentPageDashboards + 1} / {totalPagesDashboards}
        </span>
        <button
          onClick={() => handlePageChangeDashboards(currentPageDashboards + 1)}
          disabled={currentPageDashboards >= totalPagesDashboards - 1}
        >
          Next
        </button>
      </div>

      {/* Users List */}
      <div>
        <h2>Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        )}
        {/* Pagination */}
        <button
          onClick={() => handlePageChangeUsers(currentPageUsers - 1)}
          disabled={currentPageUsers <= 0}
        >
          Previous
        </button>
        <span>
          {currentPageUsers + 1} / {totalPagesUsers}
        </span>
        <button
          onClick={() => handlePageChangeUsers(currentPageUsers + 1)}
          disabled={currentPageUsers >= totalPagesUsers - 1}
        >
          Next
        </button>
      </div>

      {/* Widget Bundles List */}
      <div>
        <h2>Widget Bundles</h2>
        {loadingWidgetBundles ? (
          <p>Loading widget bundles...</p>
        ) : (
          <ul>
            {widgetBundles.map((bundle, index) => (
              <li key={index}>{bundle.name}</li>
            ))}
          </ul>
        )}
        {/* Pagination */}
        <button
          onClick={() =>
            handlePageChangeWidgetBundles(currentPageWidgetBundles - 1)
          }
          disabled={currentPageWidgetBundles <= 0}
        >
          Previous
        </button>
        <span>
          {currentPageWidgetBundles + 1} / {totalPagesWidgetBundles}
        </span>
        <button
          onClick={() =>
            handlePageChangeWidgetBundles(currentPageWidgetBundles + 1)
          }
          disabled={currentPageWidgetBundles >= totalPagesWidgetBundles - 1}
        >
          Next
        </button>
      </div>
      
    </div>
  );
};

export default MyComponent;
