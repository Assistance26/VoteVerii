// utils/syncUserToBackend.js
import axios from 'axios';

export const syncUserToBackend = async (user, extraData = {}) => {
  const token = await user.getIdToken();

  await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/sync`,
    {
      email: user.email,
      uid: user.uid,
      name: extraData.name || user.displayName || '',  // 🟢 send name
      role: extraData.role || 'voter',                 // 🟢 send role
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
};
