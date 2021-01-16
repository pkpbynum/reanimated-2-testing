import React from 'react'
import {StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import {mix} from 'react-native-redash'
import {ToastViewManager} from './ToastViewManager'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  element: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
  },
})

export default React.memo(function Toast({id}) {
  const progress = useSharedValue(0)

  // Run on first render only -- component is memoized
  const config = ToastViewManager.toastConfigs[id]
  const dismiss = () => ToastViewManager.dismiss(id)
  progress.value = withSequence(
    withTiming(1),
    withDelay(config.duration, withTiming(0, {}, () => runOnJS(dismiss)()))
  )

  ToastViewManager.setSharedValue(id, progress)

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: mix(progress.value, 0, config.style.marginBottom),
    height: mix(progress.value, 0, config.style.height),
    opacity: mix(progress.value, 0, 1),
    transform: [{scale: mix(progress.value, 0.95, 1)}],
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <Animated.View style={[styles.element, config.style]}>
          {config.render(dismiss)}
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
})
