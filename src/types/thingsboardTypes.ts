// Device types
export interface Device {
  id?: string;
  name: string;
  type: string;
  label?: string; // Optional: A user-friendly label for the device
  description?: string; // Optional: A description of the device
  credentials?: any; // Optional: Device credentials if applicable
}

// Device Profile types
export interface DeviceProfile {
  id: string;
  name: string;
  description?: string; // Optional: Description of the device profile
}

// Dashboard types
export interface Dashboard {
  id: string;
  title: string;
  description?: string; // Optional: Description of the dashboard
  createdTime?: string; // Optional: ISO 8601 format
  updatedTime?: string; // Optional: ISO 8601 format
}

export interface DashboardInfo {
  id: string;
  title: string;
  description?: string;
  createdTime?: string;
  updatedTime?: string;
}

// Widget types
export interface Widget {
  id: string;
  type: string;
  title?: string; // Optional: Title of the widget
  configuration?: any; // Optional: Widget-specific configuration
}

export interface WidgetConfig {
  id: string;
  type: string;
  settings?: any; // Optional: Settings for the widget
  layout?: any; // Optional: Layout configuration for the widget
}
