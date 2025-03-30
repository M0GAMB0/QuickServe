import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/colors';

const JoinUsScreen = () => {
  // State to store the phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  // Function to validate the Indian phone number
  const validatePhoneNumber = number => {
    const phoneRegex = /^[7-9][0-9]{9}$/;
    return phoneRegex.test(number);
  };

  // Detect current color scheme (light or dark)
  const scheme = useColorScheme();

  // Handle phone number change and validation
  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);

    // Validate phone number
    if (text.length === 10 && validatePhoneNumber(text)) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };

  // Set theme colors based on color scheme
  const backgroundColor = scheme === 'dark' ? '#222' : '#fff';
  const textColor = scheme === 'dark' ? '#fff' : '#000';
  const inputBgColor = scheme === 'dark' ? '#222' : '#F5F5F5';
  const inputBorderColor = scheme === 'dark' ? '#444' : '#ccc';
  const buttonBgColor = scheme === 'dark' ? Colors.primary : '#0066CC'; // Blue area unchanged

  return (
    <View style={[styles.container, {backgroundColor: Colors.primary}]}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={[styles.title]}>Join Us</Text>
        <Text style={[styles.subtitle]}>
          Enter your mobile number to get started
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={[styles.bottomSection, {backgroundColor}]}>
        <Text style={[styles.label, {color: textColor}]}>Phone Number</Text>
        <View style={[styles.inputContainer, {borderColor: inputBorderColor}]}>
          <View style={styles.countryCodeContainer}>
            <Text style={[styles.countryCode, {color: textColor}]}>+91</Text>
          </View>
          <TextInput
            style={[
              styles.input,
              !isValidPhoneNumber && styles.inputError,
              {backgroundColor: inputBgColor, color: textColor},
            ]}
            placeholder="Enter your phone number"
            placeholderTextColor={Colors.placeholder}
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>
        {/* Show validation message */}
        {!isValidPhoneNumber && phoneNumber.length === 10 && (
          <Text style={[styles.errorText, {color: 'red'}]}>
            Invalid phone number
          </Text>
        )}
        <Text style={[styles.infoText, {color: textColor}]}>
          We'll send you a verification code
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonBgColor}]}>
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={[styles.termsText, {color: textColor}]}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: hp('35%'),
    justifyContent: 'center',
    alignItems: 'left',
    padding: wp('4%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  subtitle: {
    fontSize: wp('4%'),
    marginTop: hp('1%'),
    color: Colors.darkText,
  },
  bottomSection: {
    flex: 1,
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    padding: wp('5%'),
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('3%'),
    width: '100%',
    height: hp('7%'),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  countryCode: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: wp('5%'),
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: wp('3.5%'),
    marginTop: hp('1%'),
    alignSelf: 'flex-start',
  },
  infoText: {
    alignSelf: 'flex-start',
    fontSize: wp('4%'),
    marginTop: hp('1%'),
  },
  button: {
    marginTop: hp('4%'),
    width: '100%',
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('3%'),
  },
  buttonText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'white',
  },
  termsText: {
    marginTop: hp('3%'),
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default JoinUsScreen;
