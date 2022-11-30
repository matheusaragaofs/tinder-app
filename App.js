import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import TesteScreen from './screens/TesteScreen';
import { useTailwind } from 'tailwind-rn/dist'
import StackNavigator from './StackNavigator';
export default function App() {

const tw = useTailwind()

  return (
    <TailwindProvider utilities={utilities}>
          <StackNavigator/>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
