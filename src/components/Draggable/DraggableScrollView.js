import React, {useRef, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {DraggableViewManager} from './DraggableViewManager'

import Draggable from './Draggable'
import {useImperativeHandle} from 'react'

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
  const ids = useSharedValue(children.map((child) => child.props.id))
  const dragId = useSharedValue(-1)
  const dragValue = useSharedValue(0)
  const offsets = useSharedValue({})
  const initialized = useSharedValue(false)
  const scrollViewLayout = useSharedValue({absoluteY: 0})
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

  useEffect(() => {
    manager._onItemsChanged(children)
  })

  useImperativeHandle(ref, () => ({
    getOrderedIds: manager.getOrderedIds,
  }))

  const extraProps = {
    manager,
  }

  return (
    <Animated.ScrollView
      onLayout={manager._onContainerLayout}
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
