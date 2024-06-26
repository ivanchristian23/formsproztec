import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Forms from './components/Forms';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import { LogBox } from 'react-native'; // Import LogBox
import Admin from './components/Admin';
import SubmissionsScreen from './components/SubmissionsScreen';
import ThankYouScreen from './components/ThankYouScreen';
LogBox.ignoreLogs([
  'Warning: ...', // Replace this with the specific warning message you want to ignore
  /Possible Unhandled Promise Rejection/, // Use a regex to match patterns
  'Warning: TextInputComponent: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'Non-serializable values were found in the navigation state.'

]);
ErrorUtils.setGlobalHandler((error, isFatal) => {
  if (error instanceof TypeError) {
    // Ignore TypeError
    return;
  }
  // Handle other types of errors or log them
  console.error(error);
});



export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name='Forms' component={Forms} options={{ title: 'Abdullah Bin Zaid Islamic Center', headerTitleAlign:'center'}}/>
        <Stack.Screen name='Admin' component={Admin} options={{ headerTitleAlign:'center'}}/>
        <Stack.Screen name="SubmissionsScreen" component={SubmissionsScreen} options={{ title: 'Submissions', headerTitleAlign:'center'}}/>
        <Stack.Screen name='ThankYouScreen' component={ThankYouScreen} options={{headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
