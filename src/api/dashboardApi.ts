import { Dashboard } from '../types/thingsboardTypes';
import thingsboardAPI from './thingsboardAPI';

// Create or Update Dashboard
export const saveDashboard = async (dashboard: Dashboard): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.post<Dashboard>('/dashboard', dashboard);
    return response.data;
  } catch (error) {
    console.error('Failed to create or update dashboard', error);
    throw error;
  }
};

// Delete a Dashboard
export const deleteDashboard = async (dashboardId: string): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to delete dashboard', error);
    throw error;
  }
};

// Get Dashboard by ID
export const getDashboardById = async (
  dashboardId: string,
  params?: { inlineImages?: boolean }
): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get<Dashboard>(
      `/dashboard/${dashboardId}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get dashboard by ID', error);
    throw error;
  }
};

// Get Customer Dashboards
export const getCustomerDashboards = async (
  customerId: string,
  params?: { pageSize?: number; page?: number; mobile?: boolean; textSearch?: string; sortProperty?: string; sortOrder?: string }
): Promise<Dashboard[]> => {
  try {
    const response = await thingsboardAPI.get<Dashboard[]>(
      `/customer/${customerId}/dashboards`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get customer dashboards', error);
    throw error;
  }
};

// Get Home Dashboard
export const getHomeDashboard = async (): Promise<Dashboard> => {
  try {
    const response = await thingsboardAPI.get<Dashboard>('/dashboard/home');
    return response.data;
  } catch (error) {
    console.error('Failed to get home dashboard', error);
    throw error;
  }
};

// Assign Dashboard to Customer
export const assignDashboardToCustomer = async (
  customerId: string,
  dashboardId: string
): Promise<void> => {
  try {
    await thingsboardAPI.post(`/customer/${customerId}/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to assign dashboard to customer', error);
    throw error;
  }
};

// Unassign Dashboard from Customer
export const unassignDashboardFromCustomer = async (
  customerId: string,
  dashboardId: string
): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/customer/${customerId}/dashboard/${dashboardId}`);
  } catch (error) {
    console.error('Failed to unassign dashboard from customer', error);
    throw error;
  }
};
