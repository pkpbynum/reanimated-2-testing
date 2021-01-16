import React from 'react'
import {View} from 'react-native'
import Animated, {useAnimatedGestureHandler} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Modal from '../components/ScreenWrapper'

const inner = React.forwardRef((props, ref) => (
  <Animated.View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      backgroundColor: 'blue',
    }}
  />
))
export default function HorizontalPaging(props1) {
  const gestureHandler = useAnimatedGestureHandler({
    onActive: () => {},
  })
  // console.log(React.Children.count(inner))
  return (
    <Modal>
      <View>
        <PanGestureHandler onGestureEvent={gestureHandler}></PanGestureHandler>
      </View>
    </Modal>
  )
}
