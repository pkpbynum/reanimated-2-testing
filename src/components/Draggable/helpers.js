export const between = (value, lowerBound, upperBound) => {
  'worklet'
  return value >= lowerBound && value <= upperBound
}

export const copyObject = (obj) => {
  'worklet'
  return obj
}

export const reorder = (basePositions, newPositions) => {
  'worklet'
  basePositions.value = newPositions.value
  newPositions.value = copyObject(basePositions.value)
}

export const generateZeroOffsets = (len) => {
  console.log('generate offsets')
  const offsets = []
  for (let i = 0; i < len; i++) {
    offsets.push(0)
  }
  return offsets
}
