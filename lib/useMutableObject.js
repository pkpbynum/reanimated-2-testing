const {useMemo} = require('react')

export default (init, deps) => {
  return useMemo(() => {
    'worklet'
    const sharedObj = init()
    return () => {
      'worklet'
      return sharedObj
    }
  }, deps)
}
