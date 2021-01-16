import React from 'react'
import {Button, Text, TouchableOpacity} from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import {useToast} from '../components/Toaster'

export default function Toast(props) {
  const {show} = useToast()
  return (
    <ScreenWrapper>
      <Button onPress={() => show({render: (dismiss) => <TouchableOpacity onPress={dismiss}>
      <Text>This is a Toast!</Text>
      </TouchableOpacity>})} title="Show Toast"></Button>
    </ScreenWrapper>
  )
}
