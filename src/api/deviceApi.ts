import { Device, DeviceProfile } from '../types/thingsboardTypes';
import thingsboardAPI from './thingsboardAPI';


// Create or Update Device
export const saveDevice = async (device: Device): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>('/device', device);
    return response.data;
  } catch (error) {
    console.error('Failed to create or update device', error);
    throw error;
  }
};

// Create Device with Credentials
export const createDeviceWithCredentials = async (device: Device): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>('/device-with-credentials', device);
    return response.data;
  } catch (error) {
    console.error('Failed to create device with credentials', error);
    throw error;
  }
};

// Delete Device
export const deleteDevice = async (deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to delete device', error);
    throw error;
  }
};

// Get Device by ID
export const getDeviceById = async (deviceId: string): Promise<Device> => {
  try {
    const response = await thingsboardAPI.get<Device>(`/device/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device by ID', error);
    throw error;
  }
};

// Get Device Credentials by Device ID
export const getDeviceCredentialsByDeviceId = async (deviceId: string): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/device/${deviceId}/credentials`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device credentials', error);
    throw error;
  }
};

// Update Device Credentials
export const updateDeviceCredentials = async (deviceId: string, credentials: any): Promise<void> => {
  try {
    await thingsboardAPI.post(`/device/${deviceId}/credentials`, credentials);
  } catch (error) {
    console.error('Failed to update device credentials', error);
    throw error;
  }
};

// Claim Device
export const claimDevice = async (deviceName: string): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>(`/customer/device/${deviceName}/claim`);
    return response.data;
  } catch (error) {
    console.error('Failed to claim device', error);
    throw error;
  }
};

// Reclaim Device
export const reClaimDevice = async (deviceName: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/device/${deviceName}/claim`);
  } catch (error) {
    console.error('Failed to reclaim device', error);
    throw error;
  }
};

// Get Customer Devices
export const getCustomerDevices = async (
  customerId: string,
  params?: { pageSize?: number; page?: number; type?: string; textSearch?: string; sortProperty?: string; sortOrder?: string }
): Promise<Device[]> => {
  try {
    const response = await thingsboardAPI.get<Device[]>(
      `/customer/${customerId}/devices`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get customer devices', error);
    throw error;
  }
};

// Assign Device to Customer
export const assignDeviceToCustomer = async (
  customerId: string,
  deviceId: string
): Promise<void> => {
  try {
    await thingsboardAPI.post(`/customer/${customerId}/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to assign device to customer', error);
    throw error;
  }
};

// Unassign Device from Customer
export const unassignDeviceFromCustomer = async (
  deviceId: string
): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to unassign device from customer', error);
    throw error;
  }
};

// Get Device Profile by ID
export const getDeviceProfileById = async (deviceProfileId: string): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.get<DeviceProfile>(`/deviceProfile/${deviceProfileId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device profile by ID', error);
    throw error;
  }
};

// Create or Update Device Profile
export const saveDeviceProfile = async (deviceProfile: DeviceProfile): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.post<DeviceProfile>('/deviceProfile', deviceProfile);
    return response.data;
  } catch (error) {
    console.error('Failed to create or update device profile', error);
    throw error;
  }
};

// Delete Device Profile
export const deleteDeviceProfile = async (deviceProfileId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/deviceProfile/${deviceProfileId}`);
  } catch (error) {
    console.error('Failed to delete device profile', error);
    throw error;
  }
};

// Get Device Profile Names
export const getDeviceProfileNames = async (params?: { activeOnly?: boolean }): Promise<string[]> => {
  try {
    const response = await thingsboardAPI.get<string[]>('/deviceProfile/names', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profile names', error);
    throw error;
  }
};

// Get Device Profiles
export const getDeviceProfiles = async (params?: { pageSize?: number; page?: number; textSearch?: string; sortProperty?: string; sortOrder?: string }): Promise<DeviceProfile[]> => {
  try {
    const response = await thingsboardAPI.get<DeviceProfile[]>('/deviceProfiles', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profiles', error);
    throw error;
  }
};
