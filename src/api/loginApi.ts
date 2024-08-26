import { useDispatch } from "react-redux";
import { User } from "../types/thingsboardTypes";
import thingsboardAPI from "./thingsboardAPI";
import { set_Accesstoken } from "../Redux/Action/Action";


export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const dispatch = useDispatch();
  try {
    const response = await thingsboardAPI.post<{ token: string }>(
      '/auth/login',
      { username, password }
    );
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(set_Accesstoken(token));
    return token;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Existing logout function
export const logout = (): void => {
  localStorage.removeItem('token');
};

// New API functions

// Change Password
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await thingsboardAPI.post('/auth/changePassword', {
      currentPassword,
      newPassword
    });
  } catch (error) {
    console.error('Change password failed', error);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await thingsboardAPI.get<User>('/auth/user');
    return response.data;
  } catch (error) {
    console.error('Get current user failed', error);
    throw error;
  }
};

// Check Activate Token
export const checkActivateToken = async (activateToken: string): Promise<void> => {
  try {
    await thingsboardAPI.get(`/noauth/activate`, { params: { activateToken } });
  } catch (error) {
    console.error('Check activate token failed', error);
    throw error;
  }
};

// Activate User
export const activateUser = async (activateToken: string, sendActivationMail: boolean): Promise<void> => {
  try {
    await thingsboardAPI.post(`/noauth/activate`, { activateToken, sendActivationMail });
  } catch (error) {
    console.error('Activate user failed', error);
    throw error;
  }
};

// Reset Password
export const resetPassword = async (newPassword: string, resetToken: string): Promise<void> => {
  try {
    await thingsboardAPI.post('/noauth/resetPassword', { newPassword, resetToken });
  } catch (error) {
    console.error('Reset password failed', error);
    throw error;
  }
};

// Check Reset Token
export const checkResetToken = async (resetToken: string): Promise<void> => {
  try {
    await thingsboardAPI.get('/noauth/resetPassword', { params: { resetToken } });
  } catch (error) {
    console.error('Check reset token failed', error);
    throw error;
  }
};

// Request Reset Password Email
export const requestResetPasswordEmail = async (email: string): Promise<void> => {
  try {
    await thingsboardAPI.post('/noauth/resetPasswordByEmail', { email });
  } catch (error) {
    console.error('Request reset password email failed', error);
    throw error;
  }
};

// Get User Password Policy
export const getUserPasswordPolicy = async (): Promise<any> => {
  try {
    const response = await thingsboardAPI.get('/noauth/userPasswordPolicy');
    return response.data;
  } catch (error) {
    console.error('Get user password policy failed', error);
    throw error;
  }
};
