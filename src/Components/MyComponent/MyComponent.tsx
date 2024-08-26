import React, { useEffect, useState } from 'react';
import {
  Device,
  DashboardType,
  User,
  DeviceQueryParams,
  PageData,
  DashboardQueryParams,
} from '../../types/thingsboardTypes';
import { getCurrentUser } from '../../api/loginApi';
import { getTenantDevices, saveDevice } from '../../api/deviceApi';
import { getTenantDashboards, saveDashboard } from '../../api/dashboardApi';
import { getUsers, saveUser } from '../../api/userApi';
import {
  getAllWidgetsBundles,
  getWidgetsBundles,
} from '../../api/widgetsBundleAPI';
import { getDeviceProfileNames } from '../../api/deviceProfileAPIs';
import { customerId, tenantId } from '../../Utility/utility_functions';

const MyComponent: React.FC = () => {
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
  const [dashboards, setDashboards] = useState<DashboardType[]>([]);
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

  const [deviceProfileNames, setDeviceProfileNames] = useState<any[]>([]);

  // Fetch widget bundles with parameters
  const fetchAllWidgetBundles = async () => {
    try {
      const response = await getAllWidgetsBundles();
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
      setTotalWidgetPages(response.totalPages ?? 0);
    } catch (error) {
      console.error('Failed to fetch widget bundles', error);
    } finally {
      setLoadingWidgetBundles(false);
    }
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
      // setDeviceType('');
      // alert('Device created successfully!');
      fetchDevices(0); // Optionally refetch devices
    } catch (error) {
      setDeviceError('Failed to create device');
    }
  };

  // Handle dashboard creation
  const handleCreateDashboard = async () => {
    try {
      const newDashboard: DashboardType = {
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
        email: 'user34@example.com',
        authority: 'TENANT_ADMIN',
        firstName: 'John',
        lastName: 'Doe',
        phone: '38012345123',
        additionalInfo: {},

      };
      await saveUser(newUser, true); // Assuming `sendActivationMail` is true
      setNewUsername('');
      alert('User created successfully!');
      fetchUsers(0);
    } catch (error: any) {
      setUserError('Failed to create user: ' + error.message); // Display error message
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
      setDevices(response.data ?? []);
    } catch (error) {
      console.error('Failed to fetch devices', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  // Fetch devices
  const fetchDeviceProfileNames = async (activeOnly: boolean) => {
    try {
      const names = await getDeviceProfileNames(activeOnly);
      setDeviceProfileNames(names);
    } catch (error) {
      console.error('Failed to load device profile names');
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

      const response: PageData<DashboardType> = await getTenantDashboards(
        params
      );
      setDashboards(response.data ?? []);
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
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch users', error);
      setUserError('Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleGetAll = async () => {
    fetchDevices(0);
    fetchDashboards(0);
    fetchUsers(0);
    fetchAllWidgetBundles();
    fetchWidgetBundles(currentWidgetPage);
    fetchDeviceProfileNames(false);
    const response = await getCurrentUser();
    console.log(response);
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
    fetchDeviceProfileNames(false);
  }, []);

  useEffect(() => {
    fetchWidgetBundles(currentWidgetPage);
  }, [currentWidgetPage]);

  return (
    <div className="menu-data" style={{ padding: '10px' }}>
      <h1>MyComponent</h1>
      <button onClick={handleGetAll}>Get Data</button>

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

      {/* Device Profiles List */}
      <div>
        <h2>Device Profiles</h2>
        <ul>
          {deviceProfileNames.map((deviceProfile) => (
            <li key={deviceProfile.id.id}>{deviceProfile.name}</li>
          ))}
        </ul>
        )
      </div>

      {/* Dashboards List */}
      <div>
        <h2>Dashboards</h2>
        {loadingDashboards ? (
          <p>Loading dashboards...</p>
        ) : (
          <ul>
            {dashboards.map((dashboard) => (
              <li key={dashboard.id.id}>{dashboard.title}</li>
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
            {users.map((user) => (
              <li key={user.id?.id}>
                {user.email}({user.authority})
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
