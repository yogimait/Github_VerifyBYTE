import axios from 'axios';

export const checkFollowStatus = async (token, username) => {
  try {
    const response = await axios.get(`https://api.github.com/user/following/${username}`, {
      headers: { Authorization: `token ${token}` }
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
};

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('/api/auth/github/callback', { code });
    return response.data.access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};