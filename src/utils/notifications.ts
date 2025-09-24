import messaging from '@react-native-firebase/messaging';

/**
 * Requests notification permission and returns the device's FCM token.
 * @returns FCM device token or null if not authorized
 */
export const getDeviceToken = async (): Promise<string | null> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) return null;

    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting device token:', error);
    return null;
  }
};
 // Example usage:
// import { getDeviceToken } from '../../utils/notifications'; 
// const deviceToken = await getDeviceToken();
