import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/slices/authSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    async function checkAuth() {
      const token = await EncryptedStorage.getItem('authToken');
      if (token) {
        dispatch(login({user: {}, token})); // Fetch user details from API
      }
    }
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
