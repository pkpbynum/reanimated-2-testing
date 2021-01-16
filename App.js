import {AppRegistry, Platform} from 'react-native'
import {name as appName} from './app.json'
import Navigator from './src/Navigator'

AppRegistry.registerComponent(appName, () => Navigator)

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root')
  AppRegistry.runApplication(appName, {rootTag})
}

export default Navigator
