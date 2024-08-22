import thingsboardAPI from "./thingsboardAPI";

// Login function
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await thingsboardAPI.post<{ token: string }>(
      '/auth/login', // Adjusted to /auth/login assuming base URL ends with /api
      { username, password }
    );
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('token');
};
