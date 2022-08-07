import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView
} from 'react-native'
import tw, { useDeviceContext } from 'twrnc'
import BottomSheet from '../components/BottomSheet'

import Chart from '../components/Chart'
import RateCard from '../components/RateCard'
import UnitDropdown from '../components/UnitDropdown'

const Main = ({ navigation, route }) => {
  const { state } = route.params
  console.debug('state', state)
  useDeviceContext(tw)

  return (
    <SafeAreaView style={tw`bg-neutral-900 h-screen w-screen`}>
      <BottomSheet state={{ state }} />
      {/* <Chart />
      <RateCard />
      <UnitDropdown />
      <StatusBar style='light' /> */}
    </SafeAreaView>
  )
}

export default Main
