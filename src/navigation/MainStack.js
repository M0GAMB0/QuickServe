import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen'; // Placeholder for Register Screen

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default MainStack;
