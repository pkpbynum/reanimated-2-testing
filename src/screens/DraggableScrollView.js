import React, {useState, useMemo, useRef} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'

import DraggableList from '../components/Draggable2/DraggableScrollView'
import {useSharedValue} from 'react-native-reanimated'
import useMutableObject from '../../lib/useMutableObject'

const styles = StyleSheet.create({
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const elementsInit = [
  {id: 'purple', text: 'purple', color: 'purple'},
  {id: 'orange', text: 'orange', color: 'orange'},
  {id: 'yellow', text: 'yellow', color: 'yellow'},
  {id: 'green', text: 'green', color: 'green'},
  {id: 'red', text: 'red', color: 'red'},
]

export default function DraggableScrollView() {
  const [state, setState] = useState([...elementsInit])
  const draggable = useRef()

  return (
    <ScreenWrapper>
      <Button
        onPress={() =>
          setState([
            {id: 'blue', text: 'blue', color: 'blue'},
            ...state.slice(2),
            ...state.slice(0, 2),
          ])
        }
        title="Add Items"
      />
      <Button onPress={() => draggable.current.test()} title="Print IDs" />
      <DraggableList ref={draggable} itemHeight={50}>
        {state.map((item) => (
          <View
            key={item.id}
            id={item.id}
            style={[styles.item, {backgroundColor: item.color}]}
          >
            <Text>{item.text}</Text>
          </View>
        ))}
      </DraggableList>
    </ScreenWrapper>
  )
}
