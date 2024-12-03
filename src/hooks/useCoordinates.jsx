import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const useCoordinates = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [coordError, setCoordError] = useState(null);

  const requestPermission = async () => {
    const granted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (granted === RESULTS.DENIED) {
      const permissionResult = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );
      return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
    }
    return granted === RESULTS.GRANTED || granted === RESULTS.LIMITED;
  };

  const fetchCoordinates = useCallback(async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setCoordError('Location permission denied.');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setCoordError(null); // Clear previous errors if any
        },
        err => {
          setCoordError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000 * 60 * 60 * 24,
        },
      );
    } catch (err) {
      setCoordError(err.message);
    }
  }, []);

  return {coordinates, coordError, fetchCoordinates};
};

export default useCoordinates;
