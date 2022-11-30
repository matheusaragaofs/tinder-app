import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import StackNavigator from './StackNavigator';
export default function App() {

  return (
    <TailwindProvider utilities={utilities}>
          <StackNavigator/>
    </TailwindProvider>
  );
}
