import {createSlice} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      EncryptedStorage.setItem('authToken', action.payload.token);
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      EncryptedStorage.removeItem('authToken');
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
