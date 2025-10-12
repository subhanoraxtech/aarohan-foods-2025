import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearPersistedState = async () => {
  try {
    await AsyncStorage.removeItem('persist:root');
    console.log('Persisted state cleared successfully');
  } catch (error) {
    console.error('Error clearing persisted state:', error);
  }
};
