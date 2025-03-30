import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import WelcomeSlider from '../screens/auth/WelcomeSlider';
import JoinUsScreen from '../screens/auth/JoinUsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="welcomeSlider">
    <Stack.Screen name="welcomeSlider" component={WelcomeSlider} />
    <Stack.Screen name="JoinUs" component={JoinUsScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
