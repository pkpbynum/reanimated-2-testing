import React from 'react'
import {View, Button} from 'react-native'
import screens from './screens'

export default function Home({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop: 100,
      }}
    >
      {screens.map(({title}) => (
        <Button
          key={title}
          onPress={() => navigation.navigate(title)}
          title={title}
        />
      ))}
    </View>
  )
}
