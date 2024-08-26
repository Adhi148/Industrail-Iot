import {
  User,
  MobileSessionData,
  UserSettings,
} from '../types/thingsboardTypes';
import thingsboardAPI from './thingsboardAPI';

// Define default page size
const DEFAULT_PAGE_SIZE = 20; // Set the default page size you want

// Get Customer Users
export const getCustomerUsers = async (
  customerId: string,
  page: number,
  textSearch: string = '',
  sortProperty: string = 'createdTime',
  sortOrder: string = 'ASC'
) => {
  try {
    const response = await thingsboardAPI.get(`/customer/${customerId}/users`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        textSearch,
        sortProperty,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching customer users:', error);
    throw new Error('Unable to fetch customer users. Please try again later.');
  }
};

// Get Tenant Users
export const getTenantAdmins = async (
  tenantId: string,
  page: number,
  textSearch: string = '',
  sortProperty: string = 'createdTime',
  sortOrder: string = 'ASC'
) => {
  try {
    const response = await thingsboardAPI.get(`/tenant/${tenantId}/users`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        textSearch,
        sortProperty,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tenant users:', error);
    throw new Error('Unable to fetch tenant users. Please try again later.');
  }
};


// Save or Update User
export const saveUser = async (
  user: User,
  sendActivationMail: boolean = false
): Promise<User> => {
  try {
    const response = await thingsboardAPI.post<User>('/user', user, {
      params: { sendActivationMail: sendActivationMail },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server responded with error:', error.response.data); // More specific server error details
    } else {
      console.error('Error creating or updating user:', error.message); // General error message
    }
    throw error;
  }
};

// Get User by ID
export const getUserById = async (userId: string) => {
  try {
    const response = await thingsboardAPI.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Unable to fetch user details. Please try again later.');
  }
};

// Delete User
export const deleteUser = async (userId: string) => {
  try {
    const response = await thingsboardAPI.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Unable to delete user. Please try again later.');
  }
};

// Get Activation Link for User
export const getActivationLink = async (userId: string) => {
  try {
    const response = await thingsboardAPI.get(`/user/${userId}/activationLink`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activation link:', error);
    throw new Error('Unable to fetch activation link. Please try again later.');
  }
};

// Get User Token
export const getUserToken = async (userId: string) => {
  try {
    const response = await thingsboardAPI.get(`/user/${userId}/token`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user token:', error);
    throw new Error('Unable to fetch user token. Please try again later.');
  }
};

// Enable/Disable User Credentials
export const setUserCredentialsEnabled = async (
  userId: string,
  userCredentialsEnabled: boolean
) => {
  try {
    const response = await thingsboardAPI.post(
      `/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=${userCredentialsEnabled}`
    );
    return response.data;
  } catch (error) {
    console.error('Error setting user credentials:', error);
    throw new Error('Unable to set user credentials. Please try again later.');
  }
};

// Get Last Visited Dashboards
export const getLastVisitedDashboards = async () => {
  try {
    const response = await thingsboardAPI.get(`/user/dashboards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching last visited dashboards:', error);
    throw new Error(
      'Unable to fetch last visited dashboards. Please try again later.'
    );
  }
};

// Report User Dashboard Action
export const reportUserDashboardAction = async (
  dashboardId: string,
  action: string
) => {
  try {
    const response = await thingsboardAPI.get(
      `/user/dashboards/${dashboardId}/${action}`
    );
    return response.data;
  } catch (error) {
    console.error('Error reporting user dashboard action:', error);
    throw new Error(
      'Unable to report user dashboard action. Please try again later.'
    );
  }
};

// Get Mobile Session
export const getMobileSession = async () => {
  try {
    const response = await thingsboardAPI.get(`/user/mobile/session`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mobile session:', error);
    throw new Error('Unable to fetch mobile session. Please try again later.');
  }
};

// Save Mobile Session
export const saveMobileSession = async (sessionData: MobileSessionData) => {
  try {
    const response = await thingsboardAPI.post(
      `/user/mobile/session`,
      sessionData
    );
    return response.data;
  } catch (error) {
    console.error('Error saving mobile session:', error);
    throw new Error('Unable to save mobile session. Please try again later.');
  }
};

// Remove Mobile Session
export const removeMobileSession = async () => {
  try {
    const response = await thingsboardAPI.delete(`/user/mobile/session`);
    return response.data;
  } catch (error) {
    console.error('Error removing mobile session:', error);
    throw new Error('Unable to remove mobile session. Please try again later.');
  }
};

// Send Activation Email
export const sendActivationMail = async (email: string) => {
  try {
    const response = await thingsboardAPI.post(
      `/user/sendActivationMail?email=${email}`
    );
    return response.data;
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw new Error('Unable to send activation email. Please try again later.');
  }
};

// Get User Settings
export const getUserSettings = async () => {
  try {
    const response = await thingsboardAPI.get(`/user/settings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user settings:', error);
    throw new Error('Unable to fetch user settings. Please try again later.');
  }
};

// Save User Settings
export const saveUserSettings = async (settings: UserSettings) => {
  try {
    const response = await thingsboardAPI.post(`/user/settings`, settings);
    return response.data;
  } catch (error) {
    console.error('Error saving user settings:', error);
    throw new Error('Unable to save user settings. Please try again later.');
  }
};

// Delete User Settings
export const deleteUserSettings = async (paths: string) => {
  try {
    const response = await thingsboardAPI.delete(`/user/settings/${paths}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user settings:', error);
    throw new Error('Unable to delete user settings. Please try again later.');
  }
};

// Check Token Access Enabled
export const isUserTokenAccessEnabled = async () => {
  try {
    const response = await thingsboardAPI.get(`/user/tokenAccessEnabled`);
    return response.data;
  } catch (error) {
    console.error('Error checking token access enabled:', error);
    throw new Error('Unable to check token access. Please try again later.');
  }
};

// Get Users
export const getUsers = async (
  page: number,
  textSearch: string = '',
  sortProperty: string = 'createdTime',
  sortOrder: string = 'ASC'
) => {
  try {
    const response = await thingsboardAPI.get(`/users`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        textSearch,
        sortProperty,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.');
  }
};

// Get Users for Assign
export const getUsersForAssign = async (
  alarmId: string,
  page: number,
  textSearch: string = '',
  sortProperty: string = 'createdTime',
  sortOrder: string = 'ASC'
) => {
  try {
    const response = await thingsboardAPI.get(`/users/assign/${alarmId}`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        textSearch,
        sortProperty,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users for assign:', error);
    throw new Error(
      'Unable to fetch users for assign. Please try again later.'
    );
  }
};

// Find Users by Query
export const findUsersByQuery = async (
  page: number,
  textSearch: string = '',
  sortProperty: string = 'createdTime',
  sortOrder: string = 'ASC'
) => {
  try {
    const response = await thingsboardAPI.get(`/users/query`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        textSearch,
        sortProperty,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error finding users by query:', error);
    throw new Error('Unable to find users by query. Please try again later.');
  }
};
