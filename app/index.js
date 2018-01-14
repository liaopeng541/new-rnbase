import { AppRegistry } from 'react-native';
import RootNavigator from './components/RootNavigator';
import Second from "./pages/Second"
AppRegistry.registerComponent('rnbase', () => RootNavigator);
AppRegistry.registerComponent('SecondActivity', () => Second);
