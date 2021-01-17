const {
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} = require('react-native-reanimated')
const {clamp} = require('react-native-redash')

const generateObj = () => {
  'worklet'
  const a = {}
  return () => {
    'worklet'
    return a
  }
}
class DraggableViewManager {
  constructor(
    _ids,
    _dragId,
    _dragValue,
    _itemHeight,
    _offsets,
    _totalItems,
    _scrollViewLayout,
    _intialized,
  ) {
    // Ordered array of ids
    this.ids = _ids
    this.dragId = _dragId
    this.dragValue = _dragValue
    this.itemHeight = _itemHeight
    this.offsets = generateObj()
    this.scrollViewLayout = _scrollViewLayout
    this.initialized = _intialized

    this.initialOffsets = {}
    this.numItems = 0
    this.totalItems = _totalItems
  }

  // Getter pattern binds class properties, making them accessible over the bridge

  // On drag of item
  get _onSwitch() {
    return (prevIdx, currIdx, offsets) => {
      'worklet'
      offsets.value[this.ids.value[currIdx]].value = prevIdx * this.itemHeight

      // Switch IDs
      const idsCopy = this.ids.value.slice()
      const tempIdx = idsCopy[prevIdx]
      idsCopy[prevIdx] = idsCopy[currIdx]
      idsCopy[currIdx] = tempIdx
      this.ids.value = idsCopy
    }
  }

  // Transform offset to index
  get _getIndex() {
    return (_offset) => {
      'worklet'
      return clamp(
        (_offset.value / this.itemHeight + 0.5) << 0,
        0,
        this.ids.value.length - 1,
      )
    }
  }

  // Generate animated style object for child
  _generateDragStyle = (_id, _offset, _animating) => {
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

  // Generate gesture handler for child
  _generateGestureHandler = (_id, _offset, _animating, offsets) => {
    return useAnimatedGestureHandler({
      onActive: (e, ctx) => {
        if (this.dragId.value === -1) {
          _animating.value = true
          this.dragId.value = _id
          ctx.initY = e.absoluteY
          ctx.initOffset = _offset.value
          ctx.prevIdx = this._getIndex(_offset)
        }

        const currIdx = this._getIndex(_offset)

        _offset.value = ctx.initOffset + e.absoluteY - ctx.initY
        if (ctx.prevIdx !== currIdx) {
          this._onSwitch(ctx.prevIdx, currIdx, offsets)
        }
        ctx.prevIdx = currIdx
      },
      onEnd: () => {
        this.dragId.value = -1
        _offset.value = this._getIndex(_offset) * this.itemHeight
      },
    })
  }

  // Collect layout information from parent
  _onContainerLayout = ({nativeEvent: {layout}}) =>
    (this.scrollViewLayout.value = layout)

  // Called for each child on initialization
  _onDraggableLayout = (_id, _index, _offset) => {
    'worklet'
    let a = this.offsets()
    a[_id] = _offset
    console.log(a)
  }

  _onItemsChanged = (_children) => {
    console.log('item changed')
  }

  getOrderedIds = () => this.ids.value
}

module.exports = {
  DraggableViewManager,
}
