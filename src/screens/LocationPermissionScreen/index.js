// LocationPermissionScreen.js
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const LocationPermissionScreen = ({navigation, route}) => {
  const {onLocationFetched} = route.params;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to continue.',
        );
        onLocationFetched(null);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Permission error:', error);
      onLocationFetched(null);
      navigation.goBack();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onLocationFetched(coords);
        navigation.goBack();
      },
      error => {
        console.error('Geolocation error:', error);
        onLocationFetched(null);
        navigation.goBack();
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Requesting location permission...</Text>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#007ACC',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default LocationPermissionScreen;
