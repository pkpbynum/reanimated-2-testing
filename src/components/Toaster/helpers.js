export const ACTIVE = 'ACTIVE'
export const TRANSITION_OUT = 'TRANSITION_OUT'

export const copyObject = (obj) => {
  'worklet'
  return JSON.parse(JSON.stringify(obj))
}

export const _show = (id, transitions) => {
  'worklet'
  const newTransitions = copyObject(transitions.value)
  newTransitions[id] = ACTIVE
  transitions.value = newTransitions
}

export const _dismiss = (id, transitions) => {
  'worklet'
  const newTransitions = copyObject(transitions.value)
  newTransitions[id] = TRANSITION_OUT
  transitions.value = newTransitions
}

export const _dismissAll = (ids, transitions) => {
  'worklet'
  const newTransitions = copyObject(transitions.value)
  for (let i = 0; i < ids.length; i++) {
    newTransitions[id] = TRANSITION_OUT
  }
  transitions.value = newTransitions
}
