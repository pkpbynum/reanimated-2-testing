import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {View, Button, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 40,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    flex: 1,
  },
})

export default function Modal({children}) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      {children}
    </View>
  )
}
