import React, {useEffect} from 'react'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {LongPressGestureHandler} from 'react-native-gesture-handler'
import {Dimensions} from 'react-native'
import {useLayoutEffect} from 'react'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

export default function Draggable({
  children,
  index,
  id,
  extraProps: {manager},
}) {
  const animating = useSharedValue(false)
  const offset = useSharedValue(index * manager.itemHeight)

  const gestureHandler = manager._generateGestureHandler(id, offset, animating)

  const dragStyle = manager._generateDragStyle(id, offset, animating)

  useEffect(() => {
    console.log('item layout')
    manager._onDraggableLayout(id, index, offset)
  }, [])

  return (
    <Animated.View style={dragStyle}>
      <LongPressGestureHandler
        minDurationMs={200}
        maxDist={SCREEN_HEIGHT}
        onGestureEvent={gestureHandler}
      >
        <Animated.View>{children}</Animated.View>
      </LongPressGestureHandler>
    </Animated.View>
  )
}
