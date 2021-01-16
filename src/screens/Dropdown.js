import React, {useState} from 'react'
import Modal from '../components/Modal'
import Dropdown from '../components/Dropdown'

const items = [
  {
    label: 'option 1 asdf asdf',
    value: 1,
  },
  {
    label: 'option 2',
    value: 2,
  },
  {
    label: 'option 3',
    value: 3,
  },
  {
    label: 'option 4',
    value: 4,
  },
  {
    label: 'option 5',
    value: 5,
  },
  {
    label: 'option 6',
    value: 6,
  },
]
export default function DropdownScreen() {
  const [dropdownValue, setDrowdownValue] = useState()
  return (
    <Modal>
      <Dropdown
        items={items}
        currentValue={dropdownValue}
        onChange={({value}) => {
          setDrowdownValue(value)
        }}
        style={{}}
        itemStyle={{}}
      />
    </Modal>
  )
}
