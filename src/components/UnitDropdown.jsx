import React, { useCallback, useState } from 'react'
import { BackHandler, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import tw from 'twrnc'
import { pascalCase } from 'case-anything/dist/index'
import storage from '../database'

const UnitDropdown = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useMMKVStorage('unit', storage, 'week')
  const [items, setItems] = useState(
    ['week', 'month', 'year', 'all']
      .map(unit => ({ label: pascalCase(unit), value: unit }))
  )
  const handleClose = useCallback(() => {
    setOpen(false)
    return true
  }, [])
  BackHandler.addEventListener('hardwareBackPress', handleClose)

  return (
    <View style={tw`w-auto m-auto mt-3 mx-5 mb-0`}>
      <Text style={tw`text-white text-lg font-semibold mb-1`}>Get data from last</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={tw`bg-gray-400 border-gray-500 border-2 mb-0`}
        dropDownContainerStyle={tw`border-gray-500 border-2 border-b-0`}
        textStyle={tw`text-neutral-200`}
        containerStyle={tw`rounded-2xl`}
        listItemContainerStyle={tw`bg-gray-400`}
        selectedItemLabelStyle={tw`font-bold`}
        labelStyle={tw`font-bold`}
      />
    </View>
  )
}
export default UnitDropdown
