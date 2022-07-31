import Constants from 'expo-constants'
import React from 'react'
import {
  SafeAreaView, Text, TouchableOpacity, View
} from 'react-native'
import tw, { useDeviceContext } from 'twrnc'
import ChartComponent from './Chart'

const Main = () => {
  useDeviceContext(tw)

  return (
    <SafeAreaView style={tw`top-[${Constants.statusBarHeight}px] bg-neutral-800 h-screen w-screen`}>
      <View style={tw`py-2 mb-5`}>
        <Text style={tw`mx-auto text-2xl font-bold text-white`}>Life rhythm</Text>
      </View>
      <ChartComponent />
      <View>
        <Text style={tw`mx-auto text-white text-sm`}>f = nº veces / tiempo</Text>
      </View>
      <View style={tw`flex flex-row mx-20 my-5`}>
        <TouchableOpacity style={tw`bg-green-500 mx-auto py-2 px-5 rounded-full border-solid border-2 border-green-700`}>
          <Text style={tw`text-white text-base font-medium`}>Positive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-red-500 mx-auto py-2 px-5 rounded-full border-solid border-2 border-red-700`}>
          <Text style={tw`text-white text-base font-medium`}>Negative</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Main
