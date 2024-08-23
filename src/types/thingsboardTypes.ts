// Device types
export interface Device {
  id?: any;
  name?: string;
  type?: string;
  label?: string; // Optional: A user-friendly label for the device
  description?: string; // Optional: A description of the device
  credentials?: any; // Optional: Device credentials if applicable
  tenantId?: string;
  customerId?: string;
  additionalInfo?: any;
}

// Device Profile types
export interface DeviceProfile {
  id?: string;
  name?: string;
  description?: string; // Optional: Description of the device profile
}

// Dashboard types
export interface DashboardType {
  id?: any;
  title?: string;
  description?: string; // Optional: Description of the dashboard
  createdTime?: string; // Optional: ISO 8601 format
  updatedTime?: string; // Optional: ISO 8601 format
  tenantId?: string;
  customerId?: string;
  additionalInfo?: any;
}

export interface DashboardInfo {
  id?: string;
  title?: string;
  description?: string;
  createdTime?: string;
  updatedTime?: string;
}

export interface DashboardQueryParams {
  pageSize: number;
  page: number;
  textSearch?: string;
  sortProperty?: string;
  sortOrder?: 'ASC' | 'DESC';
}


// Widget types
export interface Widget {
  id?: string;
  type?: string;
  title?: string; // Optional: Title of the widget
  configuration?: any; // Optional: Widget-specific configuration
}

export interface WidgetConfig {
  id?: string;
  type?: string;
  settings?: any; // Optional: Settings for the widget
  layout?: any; // Optional: Layout configuration for the widget
}

// Query Parameters
export interface DeviceQueryParams {
  pageSize?: number;
  page?: number;
  type?: string;
  textSearch?: string;
  sortProperty?: 'createdTime' | 'name' | 'deviceProfileName' | 'label' | 'customerTitle';
  sortOrder?: 'ASC' | 'DESC';
}

// Page Data
export interface PageData<T> {
  data?: T[];
  totalPages?: number;
  totalElements?: number;
  hasNext?: boolean;
}

// User types
export interface User {
  id?: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  authority?: string;
  additionalInfo?: any;
  phone?: string,

}

export interface UserSettings {
  settingsId?: string;
  userId?: string;
  settings?: any;
}

export interface MobileSessionData {
  data: any[]; // Assuming data is always present
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}


// Interface for WidgetBundle
export interface WidgetBundle {
  id?: string;
  name?: string;
  alias?: string;
  description?: string;
  title?: string;
  image?: string; // Assuming inline images are base64 encoded strings
  widgets?: Widget[]; // Optional, can be an array of Widgets
}

// Interface for Widget
export interface Widget {
  id?: string;
  name?: string;
  type?: string;
  bundleAlias?: string;
  isSystemType?: boolean;
}

// Interface for WidgetTypeFQN (Fully Qualified Name)
export interface WidgetTypeFQN {
  alias?: string;
  bundleAlias?: string;
  name?: string;
  type?: string;
}