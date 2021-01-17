import React, {useEffect} from 'react'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {LongPressGestureHandler} from 'react-native-gesture-handler'
import {onDraggableLayout} from './utils'

export default function Draggable({
  children,
  index,
  id,
  extraProps: {manager, getState, offsets},
}) {
  const animating = useSharedValue(false)
  const offset = useSharedValue(index * manager.itemHeight)

  const gestureHandler = getState().generateGestureHandler(
    id,
    offset,
    animating,
    offsets,
  )

  const dragStyle = getState().generateDragStyle(id, offset, animating)

  useEffect(() => {
    onDraggableLayout(id, index, offset, offsets)
  }, [])

  return (
    <Animated.View style={dragStyle}>
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
