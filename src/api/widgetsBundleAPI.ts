import { WidgetBundle, Widget, PageData } from '../types/thingsboardTypes';
import thingsboardAPI from './thingsboardAPI';

// Create or Update Widget Bundle
export const saveWidgetsBundle = async (
  bundle: WidgetBundle
): Promise<WidgetBundle> => {
  try {
    const response = await thingsboardAPI.post<WidgetBundle>(
      '/widgetsBundle',
      bundle
    );
    return response.data;
  } catch (error) {
    console.error('Error saving widget bundle:', error);
    throw error;
  }
};

// Delete Widget Bundle
export const deleteWidgetsBundle = async (
  widgetsBundleId: string
): Promise<void> => {
  try {
    await thingsboardAPI.delete(`/widgetsBundle/${widgetsBundleId}`);
  } catch (error) {
    console.error(
      `Error deleting widget bundle with ID ${widgetsBundleId}:`,
      error
    );
    throw error;
  }
};

// Get Widget Bundle by ID
export const getWidgetsBundleById = async (
  widgetsBundleId: string,
  inlineImages?: boolean
): Promise<WidgetBundle> => {
  try {
    const response = await thingsboardAPI.get<WidgetBundle>(
      `/widgetsBundle/${widgetsBundleId}`,
      {
        params: { inlineImages },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching widget bundle with ID ${widgetsBundleId}:`,
      error
    );
    throw error;
  }
};

// Update Widgets Bundle Widgets List from Widget Type FQNs
export const updateWidgetsBundleWidgetFqns = async (
  widgetsBundleId: string,
  widgetTypeFqns: string[]
): Promise<void> => {
  try {
    await thingsboardAPI.post(
      `/widgetsBundle/${widgetsBundleId}/widgetTypeFqns`,
      widgetTypeFqns
    );
  } catch (error) {
    console.error(
      `Error updating widget type FQNs for bundle with ID ${widgetsBundleId}:`,
      error
    );
    throw error;
  }
};

// Update Widgets Bundle Widgets Types List
export const updateWidgetsBundleWidgetTypes = async (
  widgetsBundleId: string,
  widgetTypes: Widget[]
): Promise<void> => {
  try {
    await thingsboardAPI.post(
      `/widgetsBundle/${widgetsBundleId}/widgetTypes`,
      widgetTypes
    );
  } catch (error) {
    console.error(
      `Error updating widget types for bundle with ID ${widgetsBundleId}:`,
      error
    );
    throw error;
  }
};

// Get All Widget Bundles (without pagination, sorting, and search)
export const getAllWidgetsBundles = async (): Promise<WidgetBundle[]> => {
  try {
    const response = await thingsboardAPI.get<WidgetBundle[]>(
      '/widgetsBundles'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all widget bundles:', error);
    throw error;
  }
};

// Get Widget Bundles (Paginated, Sorted, Searchable)
export const getWidgetsBundles = async (params: {
  pageSize: number;
  page: number;
  textSearch?: string;
  sortProperty?: string;
  sortOrder?: string;
  tenantOnly?: boolean;
  fullSearch?: boolean;
}): Promise<PageData<WidgetBundle>> => {
  try {
    const response = await thingsboardAPI.get<PageData<WidgetBundle>>(
      '/widgetsBundles',
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching widget bundles:', error);
    throw error;
  }
};
