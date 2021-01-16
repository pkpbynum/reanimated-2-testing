import React, {useState, useEffect, useRef} from 'react'
import {
  View,
  Dimensions,
  Modal as CoreModal,
  TouchableWithoutFeedback,
} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {mix} from 'react-native-redash'

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
const defaultStyle = () => ({})
const defaultOnBackdropPress = () => {}

export default function Modal({
  visible = false,
  onBackdropPress = defaultOnBackdropPress,
  containerStyle = defaultStyle,
  children,
  ...otherProps
}) {
  const initialRender = useRef(true)
  const progress = useSharedValue(0)
  const dragging = useSharedValue(false)
  const dragX = useSharedValue(0)
  const dragY = useSharedValue(0)
  const [baseVisible, setBaseVisible] = useState(visible)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (visible) {
      setBaseVisible(true)
      progress.value = withTiming(1, {duration: 300})
    } else {
      progress.value = withTiming(0, {duration: 300}, () => {
        runOnJS(setBaseVisible)(false)
      })
    }
  }, [visible])

  const backdropStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
      opacity: mix(progress.value, 0, 0.1),
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart: ({translationX, translationY}) => {
      dragging.value = true
      dragX.value = translationX
      dragY.value = translationY
    },
    onActive: ({translationX, translationY}) => {
      dragX.value = translationX
      dragY.value = translationY
    },
    onEnd: () => {
      dragX.value = withTiming(0)
      dragY.value = withTiming(0, {}, () => (dragging.value = false))
    },
  })

  const animatedContainerStyle = useAnimatedStyle(() =>
    containerStyle(progress),
  )

  const dragStyle = useAnimatedStyle(() => {
    if (dragging.value) {
      return {
        transform: [{translateX: dragX.value}, {translateY: dragY.value}],
      }
    } else {
      return {
        transform: [{translateX: 0}, {translateY: 0}],
      }
    }
  })
  return (
    <CoreModal animationType="none" transparent visible={baseVisible}>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <Animated.View style={backdropStyle} />
      </TouchableWithoutFeedback>
      <View
        pointerEvents="box-none"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[animatedContainerStyle, dragStyle]}>
            {children({progress, ...otherProps})}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </CoreModal>
  )
}

export const asModal = (Component) => (props) => (
  <Modal {...props}>{(props2) => <Component {...props2} />}</Modal>
)
