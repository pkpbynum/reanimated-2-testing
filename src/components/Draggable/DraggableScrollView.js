import React, {useRef, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {DraggableViewManager} from './DraggableViewManager'

import Draggable from './Draggable'
import {useImperativeHandle} from 'react'
import {
  onSwitch,
  getIndex,
  generateDragStyle,
  generateGestureHandler,
  onDraggableLayout,
  onContainerLayout,
} from './utils'
import {clamp} from 'react-native-redash'

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'visible',
  },
  container: {},
})

const defaultChildren = []
const defaultStyle = {}

export default React.forwardRef(function DraggableScrollView(
  {
    style = defaultStyle,
    contentContainerStyle = defaultStyle,
    children = defaultChildren,
    itemHeight,
    ...rest
  },
  ref,
) {
  console.log('rerender')
  const ids = useSharedValue(children.map((child) => child.props.id))
  const dragId = useSharedValue(-1)
  const dragValue = useSharedValue(0)
  const initialized = useSharedValue(false)
  const test = useSharedValue(0)
  const scrollViewLayout = useSharedValue({absoluteY: 0})
  const offsets = useRef({})

  const getState = useRef(
    (() => {
      'worklet'
      const sharedObj = {
        // ids,
        dragId: {value: -1},
        // dragValue,
        // itemHeight,
        // initialized,
        // scrollViewLayout,
        generateDragStyle,
        generateGestureHandler,
      }
      return () => {
        'worklet'
        return sharedObj
      }
    })(),
  ).current

  const manager = useRef(
    new DraggableViewManager(
      ids,
      dragId,
      dragValue,
      itemHeight,
      offsets,
      children.length,
      scrollViewLayout,
      initialized,
    ),
  ).current

  // console.log(
  //   (() => {
  //     'worklet'
  //     const o = getOffsets()
  //     o[test.value] = test.value
  //     test.value = test.value + 1
  //     console.log(o)
  //   })(),
  // )

  useImperativeHandle(ref, () => ({
    getOrderedIds: () => getState().ids.value,
    test: () => {
      offsets[test.value] = test
      test.value = test.value + 1
      console.log(offsets)
    },
  }))

  const extraProps = {
    manager,
    getState,
    offsets,
  }

  return (
    <Animated.ScrollView
      // onLayout={onContainerLayout(scrollViewLayout)}
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...rest}
    >
      <View style={{height: itemHeight * children.length}} />
      {children.map((child, i) => (
        <Draggable
          key={child.props.id}
          id={child.props.id}
          index={i}
          extraProps={extraProps}
        >
          {child}
        </Draggable>
      ))}
    </Animated.ScrollView>
  )
})
