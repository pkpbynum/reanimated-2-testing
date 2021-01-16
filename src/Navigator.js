import * as React from 'react'
import {Dimensions} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Home from './Home'
import screens from './screens'
import {ToastProvider} from './components/Toaster'

const { height: SCREEN_HEIGHT} = Dimensions.get('window')
const Stack = createSharedElementStackNavigator()

export default function Navigator() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({current: {progress}}) => ({
                cardStyle: {
                  transform: [
                    {
                      translateY: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [SCREEN_HEIGHT, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              }),
              gestureResponseDistance: {
                vertical: SCREEN_HEIGHT,
              },
            }}
            initialRouteName="Home"
            mode="modal"
          >
            <Stack.Screen name="Home" component={Home} />
            {screens.map(({title, component}) => (
              <Stack.Screen
                key={title}
                headerShown={false}
                {...{name: title, component}}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  )
}
