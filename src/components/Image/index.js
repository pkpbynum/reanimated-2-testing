import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated'

export default function ImageComponent({source, style}) {
  const loaded = useSharedValue(false)

  const imageStyles = useAnimatedStyle(() => {
    return {
      opacity: loaded.value ? withTiming(1) : 0,
    }
  })

  return (
    <View
      style={[
        {
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 5,
          overflow: 'hidden',
          borderColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Animated.View>
        <ActivityIndicator />
      </Animated.View>
      <Animated.Image
        source={source}
        style={[StyleSheet.absoluteFill, imageStyles]}
        onLoad={() => (loaded.value = true)}
      />
    </View>
  )
}
