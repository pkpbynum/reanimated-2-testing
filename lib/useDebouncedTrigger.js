import {
  useSharedValue,
  withDelay,
  withTiming,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated'

const WAITING = 0
const TRIGGERED = 1

/*
    Debounce running of a particular worklet
*/

export default (fn, delay = 300, onJS = false) => {
  const savedArgs = useSharedValue()
  const trigger = useSharedValue(WAITING)

  useDerivedValue(() => {
    'worklet'
    if (trigger.value === TRIGGERED) {
      if (onJS) {
        runOnJS(fn)(...(savedArgs.value || []))
      } else {
        fn(...(savedArgs.value || []))
      }
      trigger.value = WAITING
    }
  }, [trigger, fn])

  return (...args) => {
    'worklet'
    savedArgs.value = args
    // cancelAnimation(trigger)
    trigger.value = withDelay(delay, withTiming(TRIGGERED, {duration: 0}))
  }
}
