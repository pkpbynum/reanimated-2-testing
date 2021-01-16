import React from 'react'
import {View, ScrollView} from 'react-native'
import Modal from '../components/Modal'
import Image from '../components/Image'

export default function BetterModal(props) {
  return (
    <Modal>
      <ScrollView
        style={{marginBottom: 20}}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{height: 300, marginBottom: 10}}
          source={{uri: 'https://picsum.photos/200'}}
        />
        <Image
          style={{height: 300, marginBottom: 10}}
          source={{uri: 'https://picsum.photos/400'}}
        />
        <Image
          style={{height: 300, marginBottom: 10}}
          source={{uri: 'https://picsum.photos/800'}}
        />
      </ScrollView>
    </Modal>
  )
}
