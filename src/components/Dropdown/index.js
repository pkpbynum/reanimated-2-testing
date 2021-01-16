import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated'

const baseStyles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  textStyle: {
    fontSize: 16,
  },
})

const defaultItems = []
const defaultStyle = {}
const defaultItemStyle = {}

export default function Dropdown({
  items = defaultItems,
  style = defaultStyle,
  itemStyle = defaultItemStyle,
  onChange,
  currentValue,
}) {
  const active = useSharedValue(false)
  const display = useSharedValue(false)
  const buttonDimensions = useSharedValue()
  const dropdownDimensions = useSharedValue()

  const handleButtonPress = () => {
    'worklet'
    active.value = !active.value
    display.value = true
  }

  const handleItemPress = (item) => {
    active.value = false
    runOnJS(onChange)(item)
  }

  const dropdownStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0, {duration: 150}, () => {
        display.value = display.value || false
      }),
      top: buttonDimensions.value ? buttonDimensions.value.height + 5 : 0,
      transform: [
        {
          translateY: dropdownDimensions.value
            ? (-1 * dropdownDimensions.value.height) / 2
            : 0,
        },
        {
          scaleY: withTiming(active.value ? 1 : 0.95, {duration: 150}),
        },
        {
          translateY: dropdownDimensions.value
            ? dropdownDimensions.value.height / 2
            : 0,
        },
        {
          scale: display.value ? 1 : 0,
        },
      ],
    }
  })

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${active.value ? 180 : 0}deg`, {duration: 150}),
      },
    ],
  }))

  return (
    <View>
      <TouchableOpacity onPress={handleButtonPress}>
        <View
          style={[baseStyles.container, style]}
          onLayout={(e) => {
            buttonDimensions.value = e.nativeEvent.layout
          }}
        >
          <Text style={baseStyles.textStyle}>
            {
              (
                items.find(({value}) => value === currentValue) || {
                  label: 'Select...',
                }
              ).label
            }
          </Text>
          <Animated.View style={iconStyle}>
            <Icon name="chevron-down" size={30} color="grey" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.ScrollView
        onLayout={(e) => {
          dropdownDimensions.value = e.nativeEvent.layout
        }}
        bounces={false}
        style={[baseStyles.dropdownContainer, dropdownStyle]}
      >
        <View>
          {items.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => handleItemPress(item)}
            >
              <View style={[baseStyles.item, itemStyle]}>
                <Text style={baseStyles.textStyle}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  )
}
