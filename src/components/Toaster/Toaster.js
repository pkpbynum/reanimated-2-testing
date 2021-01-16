import React, {useState, useCallback} from 'react'
import {View, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {ToastViewManager} from './ToastViewManager'

import Toast from './Toast'
import {useMemo} from 'react'
import {useEffect} from 'react'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    overflow: 'visible',
    alignItems: 'center',
  },
})

const defaultStyle = {}

const ToastContext = React.createContext()
export const useToast = () => React.useContext(ToastContext)

export function ToastProvider({children, containerStyle = defaultStyle}) {
  const insets = useSafeAreaInsets()
  const [renderedToasts, setRenderedToasts] = useState([])

  useEffect(() => {
    ToastViewManager.setter = setRenderedToasts
  }, [])

  const ctxValue = useMemo(() => ({
    show: ToastViewManager.show,
    dismiss: ToastViewManager.dismiss,
  }))

  return (
    <ToastContext.Provider value={ctxValue}>
      <View
        pointerEvents="box-none"
        collapsable
        style={[{...styles.container, top: insets.top}, containerStyle]}
      >
        {renderedToasts.map((id) => (
          <Toast key={id} id={id} />
        ))}
      </View>
      {children}
    </ToastContext.Provider>
  )
}
