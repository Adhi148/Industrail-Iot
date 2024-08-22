import { Dashboard, PageData } from '../../types/thingsboardTypes';
import thingsboardAPI from './thingsboardAPI';


// Create or Update Dashboard
export const saveDashboard = async (dashboard: Dashboard): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post('/dashboard', dashboard);
    return response.data;
  } catch (error) {
    console.error('Failed to save dashboard', error);
    throw error;
  }
};

// Get Dashboard by ID
export const getDashboardById = async (dashboardId: string, inlineImages = false): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get(`/dashboard/${dashboardId}`, { params: { inlineImages } });
    return response.data;
  } catch (error) {
    console.error('Failed to get dashboard by ID', error);
    throw error;
  }
};

// Delete Dashboard
export const deleteDashboard = async (dashboardId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to delete dashboard', error);
    throw error;
  }
};

// Assign Dashboard to Customer
export const assignDashboardToCustomer = async (customerId: string, dashboardId: string): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post(`/customer/${customerId}/dashboard/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to assign dashboard to customer', error);
    throw error;
  }
};

// Unassign Dashboard from Customer
export const unassignDashboardFromCustomer = async (customerId: string, dashboardId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/${customerId}/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to unassign dashboard from customer', error);
    throw error;
  }
};

// Assign Dashboard to Public Customer
export const assignDashboardToPublicCustomer = async (dashboardId: string): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post(`/customer/public/dashboard/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to assign dashboard to public customer', error);
    throw error;
  }
};

// Unassign Dashboard from Public Customer
export const unassignDashboardFromPublicCustomer = async (dashboardId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/public/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to unassign dashboard from public customer', error);
    throw error;
  }
};

// Get Customer Dashboards with Pagination
export const getCustomerDashboards = async (customerId: string, params: { pageSize: number; page: number; mobile?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string }): Promise<PageData<Dashboard>> => {
  try {
    const response = await thingsboardAPI.get(`/customer/${customerId}/dashboards`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get customer dashboards', error);
    throw error;
  }
};

// Update Dashboard Customers
export const updateDashboardCustomers = async (dashboardId: string, customerIds: string[]): Promise<void> => {
  try {
    await thingsboardAPI.post(`/dashboard/${dashboardId}/customers`, customerIds);
  } catch (error) {
    console.error('Failed to update dashboard customers', error);
    throw error;
  }
};

// Add Dashboard Customers
export const addDashboardCustomers = async (dashboardId: string, customerIds: string[]): Promise<void> => {
  try {
    await thingsboardAPI.post(`/dashboard/${dashboardId}/customers/add`, customerIds);
  } catch (error) {
    console.error('Failed to add dashboard customers', error);
    throw error;
  }
};

// Remove Dashboard Customers
export const removeDashboardCustomers = async (dashboardId: string, customerIds: string[]): Promise<void> => {
  try {
    await thingsboardAPI.post(`/dashboard/${dashboardId}/customers/remove`, customerIds);
  } catch (error) {
    console.error('Failed to remove dashboard customers', error);
    throw error;
  }
};

// Get Home Dashboard
export const getHomeDashboard = async (): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get('/dashboard/home');
    return response.data;
  } catch (error) {
    console.error('Failed to get home dashboard', error);
    throw error;
  }
};

// Get Home Dashboard Info
export const getHomeDashboardInfo = async (): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get('/dashboard/home/info');
    return response.data;
  } catch (error) {
    console.error('Failed to get home dashboard info', error);
    throw error;
  }
};

// Get Dashboard Info by ID
export const getDashboardInfoById = async (dashboardId: string): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get(`/dashboard/info/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get dashboard info by ID', error);
    throw error;
  }
};

// Get Max Data Points Limit
export const getMaxDatapointsLimit = async (): Promise<number> => {
  try {
    const response = await thingsboardAPI.get('/dashboard/maxDatapointsLimit');
    return response.data;
  } catch (error) {
    console.error('Failed to get max data points limit', error);
    throw error;
  }
};

// Get Server Time
export const getServerTime = async (): Promise<number> => {
  try {
    const response = await thingsboardAPI.get('/dashboard/serverTime');
    return response.data;
  } catch (error) {
    console.error('Failed to get server time', error);
    throw error;
  }
};

// Assign Dashboard to Edge
export const assignDashboardToEdge = async (edgeId: string, dashboardId: string): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post(`/edge/${edgeId}/dashboard/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to assign dashboard to edge', error);
    throw error;
  }
};

// Unassign Dashboard from Edge
export const unassignDashboardFromEdge = async (edgeId: string, dashboardId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/edge/${edgeId}/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to unassign dashboard from edge', error);
    throw error;
  }
};

// Get Edge Dashboards with Pagination
export const getEdgeDashboards = async (edgeId: string, params: { pageSize: number; page: number; textSearch?: string; sortProperty?: string; sortOrder?: string }): Promise<PageData<Dashboard>> => {
  try {
    const response = await thingsboardAPI.get(`/edge/${edgeId}/dashboards`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get edge dashboards', error);
    throw error;
  }
};

// Get Tenant Dashboards with Pagination
export const getTenantDashboards = async (params: { pageSize: number; page: number; mobile?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string }): Promise<PageData<Dashboard>> => {
  try {
    const response = await thingsboardAPI.get('/tenant/dashboards', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get tenant dashboards', error);
    throw error;
  }
};

// Get Tenant Home Dashboard Info
export const getTenantHomeDashboardInfo = async (): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get('/tenant/dashboard/home/info');
    return response.data;
  } catch (error) {
    console.error('Failed to get tenant home dashboard info', error);
    throw error;
  }
};

// Update Tenant Home Dashboard Info
export const updateTenantHomeDashboardInfo = async (dashboard: Dashboard): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post('/tenant/dashboard/home/info', dashboard);
    return response.data;
  } catch (error) {
    console.error('Failed to update tenant home dashboard info', error);
    throw error;
  }
};