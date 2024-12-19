import PocketBase from 'pocketbase';

// Default to localhost for development if no URL is provided
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

export const pb = new PocketBase(pocketbaseUrl);

// Add custom health check method
const healthCheck = async () => {
  try {
    await pb.health.check();
    return { status: 'healthy' };
  } catch (error) {
    return { status: 'unhealthy', error };
  }
};

pb.autoCancellation(false);

export const getCurrentUser = () => {
  return pb.authStore.model;
};

export const isAuthenticated = () => {
  return pb.authStore.isValid;
};

export { healthCheck };