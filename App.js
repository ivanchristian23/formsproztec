import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Shopping from './components/Shopping';
import Content from './components/Content';
import Forms from './components/Forms';

export default function App() {
  return (
    <SafeAreaView>
        <Forms></Forms>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
