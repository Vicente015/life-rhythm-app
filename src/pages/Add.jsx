import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useMemo, useRef } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'

import tw, { useDeviceContext } from 'twrnc'

const Main = ({ navigation, route }) => {
  useDeviceContext(tw)

  // ref
  const bottomSheetModalReference = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalReference.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    // debug: console.log('handleSheetChanges', index)
  }, [])

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tw`bg-neutral-900 h-screen w-screen`}>
        <View style={tw`flex items-center mt-5`}>
          <Text style={tw`font-semibold text-2xl text-neutral-50`}>Añadir registro</Text>
          <Button
            onPress={handlePresentModalPress}
            title='Present Modal'
            color='black'
          />
          <BottomSheetModal
            ref={bottomSheetModalReference}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </View>
        <StatusBar style='light' />
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default Main
