import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView
} from 'react-native'
import tw, { useDeviceContext } from 'twrnc'

import Chart from '../components/Chart'
import RateCard from '../components/RateCard'
import UnitDropdown from '../components/UnitDropdown'

const Main = ({ navigation, route }) => {
  useDeviceContext(tw)

  return (
    <SafeAreaView style={tw`bg-neutral-900 h-screen w-screen`}>
      <Chart />
      <RateCard />
      <UnitDropdown />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Main
