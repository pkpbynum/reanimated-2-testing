import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated'
import ScreenWrapper from '../components/ScreenWrapper'
import Modal, {asModal} from '../components/Modal/index'
import {mix} from 'react-native-redash'

const ModalContent = ({progress, ...props}) => {
  const postTransition = useSharedValue(0)

  const derived = useAnimatedReaction(
    () => {
      return progress.value === 1
    },
    (b) => {
      if (b) postTransition.value = withTiming(1)
    },
  )

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(postTransition.value, 0, 1),
      transform: [{translateY: mix(postTransition.value, 10, 0)}],
    }
  })

  return (
    <View>
      <Animated.Text style={textStyle}>Modal Content</Animated.Text>
    </View>
  )
}

const MyModal = asModal(ModalContent)

export default function BetterModal(props) {
  const [visible, setVisible] = useState(false)

  return (
    <ScreenWrapper>
      <Button onPress={() => setVisible(true)} title="Open Modal" />
      <MyModal
        visible={visible}
        containerStyle={(progress) => {
          'worklet'
          return {
            opacity: mix(progress.value, 0, 1),
            transform: [{translateY: mix(progress.value, 500, 0)}],
            width: 300,
            height: 300,
            borderRadius: 15,
            backgroundColor: 'white',
          }
        }}
        onBackdropPress={() => setVisible(false)}
      />
    </ScreenWrapper>
  )
}
