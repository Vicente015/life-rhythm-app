import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import tw from 'twrnc'
import { pascalCase } from 'case-anything/dist/index.es'
import storage from '../database'

const UnitDropdown = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useMMKVStorage('unit', storage, 'week')
  const [items, setItems] = useState(
    ['week', 'month', 'year', 'all']
      .map(unit => ({ label: pascalCase(unit), value: unit }))
  )

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={tw``}
      containerStyle={tw`w-70 m-auto mt-3`}
    />
  )
}
export default UnitDropdown
