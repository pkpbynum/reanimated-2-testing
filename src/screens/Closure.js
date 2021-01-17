import React, {useRef} from 'react'
import {View, Button} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import ScreenWrapper from '../components/ScreenWrapper'
import {PanGestureHandler} from 'react-native-gesture-handler'

const ids = ['red', 'orange', 'blue', 'yellow']

const Child = ({id, index, getState}) => {
  const offset = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      // const state = getState()
      // console.log(state)
      offset.value = e.translationY
    },
  })

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: id,
    transform: [{translateY: offset.value}, {translateX: index * 50}],
  }))

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        onLayout={() => {
          'worklet'
          getState().offsets[id] = offset
          console.log(getState())
        }}
        style={animatedStyle}
      />
    </PanGestureHandler>
  )
}

export default function Test() {
  const x = useSharedValue(0)
  const already = useSharedValue(50)
  const getState = useRef(
    (() => {
      'worklet'
      const mutableObj = {
        already,
        offsets: {},
      }
      return () => {
        'worklet'
        return mutableObj
      }
    })(),
  ).current

  const onPress = () => {
    'worklet'
    const state = getState()
    state[x.value] = x
    x.value = 10 + x.value
    console.log(state)
  }

  return (
    <ScreenWrapper>
      <Button onPress={onPress} title="Mutate Object" />
      <View>
        {ids.map((id, i) => (
          <Child key={id} id={id} index={i} getState={getState} />
        ))}
      </View>
    </ScreenWrapper>
  )
}
