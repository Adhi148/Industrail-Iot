import thingsboardAPI from './thingsboardAPI'; // Make sure to import your existing Axios instance
import { DeviceProfile, PageData } from '../types/thingsboardTypes';

// Create or Update Device Profile
export const saveDeviceProfile = async (
  deviceProfile: DeviceProfile
): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.post<DeviceProfile>('/deviceProfile', deviceProfile);
    return response.data;
  } catch (error) {
    console.error('Failed to create or update device profile', error);
    throw error;
  }
};

// Delete Device Profile
export const deleteDeviceProfile = async (
  deviceProfileId: string
): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/deviceProfile/${deviceProfileId}`);
  } catch (error) {
    console.error('Failed to delete device profile', error);
    throw error;
  }
};

// Get Device Profile by ID
export const getDeviceProfileById = async (
  deviceProfileId: string,
  inlineImages?: boolean
): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.get<DeviceProfile>(`/deviceProfile/${deviceProfileId}`, {
      params: { inlineImages },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profile by ID', error);
    throw error;
  }
};

// Make Device Profile Default
export const setDefaultDeviceProfile = async (
  deviceProfileId: string
): Promise<void> => {
  try {
    await thingsboardAPI.post(`/deviceProfile/${deviceProfileId}/default`);
  } catch (error) {
    console.error('Failed to set default device profile', error);
    throw error;
  }
};

// Get Attribute Keys
export const getAttributesKeys = async (
  deviceProfileId?: string
): Promise<string[]> => {
  try {
    const response = await thingsboardAPI.get<string[]>('/deviceProfile/devices/keys/attributes', {
      params: { deviceProfileId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get attribute keys', error);
    throw error;
  }
};

// Get Time-Series Keys
export const getTimeseriesKeys = async (
  deviceProfileId?: string
): Promise<string[]> => {
  try {
    const response = await thingsboardAPI.get<string[]>('/deviceProfile/devices/keys/timeseries', {
      params: { deviceProfileId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get time-series keys', error);
    throw error;
  }
};

// Get Device Profile Names
export const getDeviceProfileNames = async (
  activeOnly?: boolean
): Promise<string[]> => {
  try {
    const response = await thingsboardAPI.get<string[]>('/deviceProfile/names', {
      params: { activeOnly },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profile names', error);
    throw error;
  }
};

// Get Device Profile Info by ID
export const getDeviceProfileInfoById = async (
  deviceProfileId: string
): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.get<DeviceProfile>(`/deviceProfileInfo/${deviceProfileId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get device profile info by ID', error);
    throw error;
  }
};

// Get Default Device Profile Info
export const getDefaultDeviceProfileInfo = async (): Promise<DeviceProfile> => {
  try {
    const response = await thingsboardAPI.get<DeviceProfile>('/deviceProfileInfo/default');
    return response.data;
  } catch (error) {
    console.error('Failed to get default device profile info', error);
    throw error;
  }
};

// Get Device Profiles for Transport Type
export const getDeviceProfileInfos = async (
  pageSize?: number,
  page?: number,
  textSearch?: string,
  sortProperty?: string,
  sortOrder?: string,
  transportType?: string
): Promise<PageData<DeviceProfile>> => {
  try {
    const response = await thingsboardAPI.get<PageData<DeviceProfile>>('/deviceProfileInfos', {
      params: { pageSize, page, textSearch, sortProperty, sortOrder, transportType },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profiles for transport type', error);
    throw error;
  }
};

// Get Device Profiles
export const getDeviceProfiles = async (
  pageSize?: number,
  page?: number,
  textSearch?: string,
  sortProperty?: string,
  sortOrder?: string
): Promise<PageData<DeviceProfile>> => {
  try {
    const response = await thingsboardAPI.get<PageData<DeviceProfile>>('/deviceProfiles', {
      params: { pageSize, page, textSearch, sortProperty, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get device profiles', error);
    throw error;
  }
};
