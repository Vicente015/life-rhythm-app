import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView, Text, TouchableOpacity, View
} from 'react-native'
import tw, { useDeviceContext } from 'twrnc'

import Button from '../components/Button'
import Chart from '../components/Chart'
import UnitDropdown from '../components/UnitDropdown'
import database from '../database'

const Main = () => {
  useDeviceContext(tw)

  return (
    <SafeAreaView style={tw`bg-neutral-900 h-screen w-screen`}>
      <Chart />
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
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Main
