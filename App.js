// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import LocationPermissionScreen from './src/screens/LocationPermissionScreen';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  // Helper functions for validation
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = number => {
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
    return phoneRegex.test(number);
  };

  const validatePassword = password => password.length >= 6;

  const showToast = message => {
    Toast.show({
      type: 'error', // or 'success' for success messages
      text1: message,
      position: 'bottom',
    });
  };

  const handleSignUp = () => {
    // Validate inputs
    if (!fullName) {
      showToast('Full Name is required');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      showToast('Phone Number must be 10 digits');
      return;
    }
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      showToast('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }

    // Prepare data for API submission
    const signupData = {
      fullName,
      phoneNumber,
      email,
      password,
    };

    // Replace this with your API call logic
    console.log('Sending data to API:', signupData);
    Toast.show({
      type: 'success',
      text1: 'Account created successfully',
      position: 'bottom',
    });
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create a QuickServe Account</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="#007ACC"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <MaterialIcons
            name={confirmPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="#007ACC"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginPrompt}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F8FF',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#007ACC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#007ACC',
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    color: '#007ACC',
    textAlign: 'center',
    fontWeight: '500',
  },
});
