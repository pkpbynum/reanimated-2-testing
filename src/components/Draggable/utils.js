const {
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} = require('react-native-reanimated')
const {clamp} = require('react-native-redash')

// ids
// dragId
// dragValue
// itemHeight
// initialized
// scrollViewLayout
// offsets: {}

export const onSwitch = function (prevIdx, currIdx, getOffsets) {
  'worklet'
  console.log('onSwitch', this.offsets)
  this.offsets[this.ids.value[currIdx]].value = prevIdx * this.itemHeight

  // Switch IDs
  const idsCopy = this.ids.value.slice()
  const tempIdx = idsCopy[prevIdx]
  idsCopy[prevIdx] = idsCopy[currIdx]
  idsCopy[currIdx] = tempIdx
  this.ids.value = idsCopy
}

export const getIndex = function (_offset) {
  'worklet'
  return clamp(
    (_offset.value / this.itemHeight + 0.5) << 0,
    0,
    this.ids.value.length - 1,
  )
}

export const generateDragStyle = function (_id, _offset, _animating) {
  return useAnimatedStyle(() => {
    const isDragging = this.dragId.value === _id
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: _animating.value ? 99 : 0,
      transform: [
        {
          translateY: isDragging
            ? _offset.value
            : withTiming(_offset.value, {}, () => (_animating.value = false)),
        },
        {scale: withTiming(isDragging ? 1.05 : 1)},
      ],
    }
  })
}

export const generateGestureHandler = function (
  _id,
  _offset,
  _animating,
  getOffsets,
) {
  return useAnimatedGestureHandler({
    onActive: (e, ctx) => {
      if (this.dragId.value === -1) {
        _animating.value = true
        this.dragId.value = _id
        ctx.initY = e.absoluteY
        ctx.initOffset = _offset.value
        ctx.prevIdx = getIndex.call(this, _offset)
      }

      const currIdx = getIndex.call(this, _offset)

      _offset.value = ctx.initOffset + e.absoluteY - ctx.initY
      if (ctx.prevIdx !== currIdx) {
        onSwitch.call(this, ctx.prevIdx, currIdx, getOffsets)
      }
      ctx.prevIdx = currIdx
    },
    onEnd: () => {
      this.dragId.value = -1
      _offset.value = getIndex.call(this, _offset) * this.itemHeight
    },
  })
}

export const onContainerLayout = (scrollViewLayout) => ({
  nativeEvent: {layout},
}) => {
  scrollViewLayout.value = layout
}

export const onDraggableLayout = function (_id, _index, _offset, offsets) {
  const _offsets = offsets
  _offset.value = _index * 1
  _offsets[_id] = _offset
  console.log(_offsets)
}
