import React, { useCallback, useMemo, useRef } from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import Button from '../components/Button'

export default function BottomSheet ({ state }) {
  console.debug('stateweeee', state)
  // Reference
  const bottomSheetReference = useRef(null)

  const snapPoints = useMemo(() => ['25%', '40%'], [])

  // Callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])

  // const handleOpenPress = () => bottomSheetReference.current.expand()
  const handleClosePress = () => bottomSheetReference.current.close()

  return (
    <BottomSheet
      ref={bottomSheetReference}
      index={state}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={tw`bg-neutral-800`}
      handleIndicatorStyle={tw`bg-neutral-400`}
      enablePanDownToClose
    >
      <View style={tw`flex items-center`}>
        <Text style={tw`font-semibold text-xl text-neutral-50`}>Añadir registro</Text>

        <View onTouchEnd={handleClosePress} style={tw`flex flex-row mt-3`}>
          <Button color='green' text='Positivo' />
          <Button color='red' text='Negativo' />
        </View>
      </View>
    </BottomSheet>
  )
}
