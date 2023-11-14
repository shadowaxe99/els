import { authToken } from '../config/api_keys';
import { fetchWithToken } from '../utils/fetchWithToken';

const BASE_URL = 'https://elysium-os-backend.com/api';

export const userProfile = {
  userId: null,
  username: '',
  email: '',
  profilePicture: '',
  preferences: {},
};

export const fetchUserData = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/user/profile`, authToken);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    userProfile.userId = data._id;
    userProfile.username = data.username;
    userProfile.email = data.email;
    userProfile.profilePicture = data.profilePicture;
    userProfile.preferences = data.preferences;
    return userProfile;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserProfile = async (updatedProfile) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/user/profile`, authToken, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    const data = await response.json();
    userProfile.userId = data._id;
    userProfile.username = data.username;
    userProfile.email = data.email;
    userProfile.profilePicture = data.profilePicture;
    userProfile.preferences = data.preferences;
    return userProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const deleteUserAccount = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/user`, authToken, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user account');
    }
    return true;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};