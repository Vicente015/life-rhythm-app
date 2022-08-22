import dayjs from 'dayjs'
import React from 'react'
import {
  Text, TouchableOpacity
} from 'react-native'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import tw from 'twrnc'
import storage from '../database'

const Button = ({ color, text }) => {
  const [records, setRecords] = useMMKVStorage('records', storage, [])

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const addRecord = () => {
    return setRecords(
      [
        ...records,
        // eslint-disable-next-line quote-props
        { 'date': dayjs().valueOf(), 'value': color === 'green' ? 1 : 0 }
      ])
  }

  return (
    <TouchableOpacity onPress={addRecord} style={tw`bg-${color}-500 py-2 px-5 rounded-full border-solid border-2 border-${color}-700 ml-3`}>
      <Text style={tw`text-white text-base font-medium`}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
