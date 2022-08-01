import Constants from 'expo-constants'
import React from 'react'
import {
  SafeAreaView, Text, TouchableOpacity, View
} from 'react-native'
import tw, { useDeviceContext } from 'twrnc'
import database from '../database'
import Button from './Button'
import Chart from './Chart'
import UnitDropdown from './UnitDropdown'

const Main = () => {
  useDeviceContext(tw)

  return (
    <SafeAreaView style={tw`top-[${Constants.statusBarHeight}px] bg-neutral-800 h-screen w-screen`}>
      <View style={tw`py-2 mb-5`}>
        <Text style={tw`mx-auto text-2xl font-bold text-white`}>Life Rhythm</Text>
      </View>
      <Chart />
      <View>
        <Text style={tw`mx-auto text-white text-sm`}>f = nº veces / tiempo</Text>
      </View>
      <View style={tw`flex flex-row m-auto mt-3 mb-0`}>
        <Button color='green' text='Positive' />
        <Button color='red' text='Negative' />
      </View>
      <View style={tw`flex flex-row m-auto mt-3 mb-0`}>
        <TouchableOpacity onPress={() => database.clearStore()} style={tw`bg-red-600 py-2 px-5 rounded-full border-solid border-2 border-red-700`}>
          <Text style={tw`text-white text-base font-medium`}>Reset</Text>
        </TouchableOpacity>
      </View>
      <UnitDropdown />
    </SafeAreaView>
  )
}

export default Main
