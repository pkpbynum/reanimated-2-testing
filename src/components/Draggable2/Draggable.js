import React, {useEffect} from 'react'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {LongPressGestureHandler} from 'react-native-gesture-handler'
import {onDraggableLayout} from './utils'
import {
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import {clamp} from 'react-native-redash'

export default function Draggable({
  children,
  index,
  id,
  extraProps: {getState},
}) {
  const offset = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (e, ctx) => {
      const state = getState()
      console.log(state)
      if (state.dragId.value === -1) {
        state.dragId.value = id
        ctx.initY = e.absoluteY
        ctx.initOffset = offset.value
      }
      offset.value = ctx.initOffset + e.absoluteY - ctx.initY
    },
  })

  const dragStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: id,
    transform: [{translateY: offset.value}, {translateX: index * 50}],
  }))

  return (
    <Animated.View
      onLayout={() => {
        'worklet'
        getState().offsets[id] = offset
        console.log(getState())
      }}
      style={dragStyle}
    >
      <LongPressGestureHandler
        minDurationMs={200}
        maxDist={Number.MAX_SAFE_INTEGER}
        onGestureEvent={gestureHandler}
      >
        <Animated.View>{children}</Animated.View>
      </LongPressGestureHandler>
    </Animated.View>
  )
}
