import thingsboardAPI from './thingsboardAPI';
import { Device, DeviceQueryParams, PageData } from '../types/thingsboardTypes';

// Assign device to customer
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

// Get Customer Device Infos
export const getCustomerDeviceInfos = async (
  customerId: string,
  params?: { pageSize?: number; page?: number; type?: string; active?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string }
): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/customer/${customerId}/deviceInfos`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get customer device infos', error);
    throw error;
  }
};

// Get Customer Devices
export const getCustomerDevices = async (
  customerId: string,
  params?: { pageSize?: number; page?: number; type?: string; textSearch?: string; sortProperty?: string; sortOrder?: string }
): Promise<Device[]> => {
  try {
    const response = await thingsboardAPI.get(`/customer/${customerId}/devices`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get customer devices', error);
    throw error;
  }
};

// Unassign device from customer
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

// Claim device
export const claimDevice = async (deviceName: string): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>(`/customer/device/${deviceName}/claim`);
    return response.data;
  } catch (error) {
    console.error('Failed to claim device', error);
    throw error;
  }
};

// Reclaim device
export const reClaimDevice = async (deviceName: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/device/${deviceName}/claim`);
  } catch (error) {
    console.error('Failed to reclaim device', error);
    throw error;
  }
};

// Make device publicly available
export const assignDeviceToPublicCustomer = async (deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.post(`/customer/public/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to make device publicly available', error);
    throw error;
  }
};

// Create Device with Credentials
export const saveDeviceWithCredentials = async (device: Device): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>('/device-with-credentials', device);
    return response.data;
  } catch (error) {
    console.error('Failed to create device with credentials', error);
    throw error;
  }
};

// Create or Update Device
export const saveDevice = async (device: Device, accessToken?: string): Promise<Device> => {
  try {
    const response = await thingsboardAPI.post<Device>('/device', device, { params: { accessToken } });
    return response.data;
  } catch (error) {
    console.error('Failed to create or update device', error);
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

// Delete Device
export const deleteDevice = async (deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to delete device', error);
    throw error;
  }
};

// Get Device Credentials by Device ID
export const getDeviceCredentialsByDeviceId = async (deviceId: string): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/device/${deviceId}/credentials`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device credentials by ID', error);
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

// Import the bulk of devices
export const processDevicesBulkImport = async (devices: any[]): Promise<void> => {
  try {
    await thingsboardAPI.post('/device/bulk_import', devices);
  } catch (error) {
    console.error('Failed to import bulk devices', error);
    throw error;
  }
};

// Get Device Info by ID
export const getDeviceInfoById = async (deviceId: string): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/device/info/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device info by ID', error);
    throw error;
  }
};

// Find related devices
export const getAllDevices = async (query: any): Promise<any> => {
  try {
    const response = await thingsboardAPI.post('/devices');
    return response.data;
  } catch (error) {
    console.error('Failed to find related devices', error);
    throw error;
  }
};

// Get Devices By Ids
export const getDevicesByIds = async (deviceIds: string[]): Promise<Device[]> => {
  try {
    const response = await thingsboardAPI.get('/devices', { params: { deviceIds } });
    return response.data;
  } catch (error) {
    console.error('Failed to get devices by IDs', error);
    throw error;
  }
};

// Count devices by device profile
export const countByDeviceProfileAndEmptyOtaPackage = async (otaPackageType: string, deviceProfileId: string): Promise<number> => {
  try {
    const response = await thingsboardAPI.get(`/devices/count/${otaPackageType}/${deviceProfileId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to count devices by device profile', error);
    throw error;
  }
};

// Assign device to edge
export const assignDeviceToEdge = async (edgeId: string, deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.post(`/edge/${edgeId}/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to assign device to edge', error);
    throw error;
  }
};

// Unassign device from edge
export const unassignDeviceFromEdge = async (edgeId: string, deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/edge/${edgeId}/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to unassign device from edge', error);
    throw error;
  }
};

// Get devices assigned to edge
export const getEdgeDevices = async (
  edgeId: string,
  params?: { pageSize?: number; page?: number; type?: string; active?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string; startTime?: number; endTime?: number }
): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/edge/${edgeId}/devices`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get devices assigned to edge', error);
    throw error;
  }
};

// Assign device to tenant
export const assignDeviceToTenant = async (tenantId: string, deviceId: string): Promise<void> => {
  try {
    await thingsboardAPI.post(`/tenant/${tenantId}/device/${deviceId}`);
  } catch (error) {
    console.error('Failed to assign device to tenant', error);
    throw error;
  }
};

// Get Tenant Device Infos
export const getTenantDeviceInfos = async (
  params?: { pageSize?: number; page?: number; type?: string; active?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string }
): Promise<any> => {
  try {
    const response = await thingsboardAPI.get(`/tenant/deviceInfos`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get tenant device infos', error);
    throw error;
  }
};

// Get Tenant Device
export const getTenantDevice = async (deviceName: string): Promise<Device> => {
  try {
    const response = await thingsboardAPI.get<Device>(`/tenant/devices`, { params: { deviceName } });
    return response.data;
  } catch (error) {
    console.error('Failed to get tenant device', error);
    throw error;
  }
};

// Get Tenant Devices
export const getTenantDevices = async (
  params: DeviceQueryParams
): Promise<PageData<Device>> => {
  try {
    const response = await thingsboardAPI.get('/tenant/devices', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get tenant devices', error);
    throw error;
  }
};
