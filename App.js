/* eslint-disable sort/imports */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BackHandler, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import tw from 'twrnc'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie, faCirclePlus, faGear, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'

// * Screens
import Home from './src/pages/Home'

// * Components
import MoodButton from './src/components/MoodButton'

library.add(faHome, faGear, faCirclePlus, faChartPie, faHeart)

function TestScreen () {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>uwu</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

const TabIcons = {
  add: 'circle-plus',
  historic: 'chart-pie',
  home: 'house',
  settings: 'gear'
}

function BottomSheet ({ reference: bottomSheetModalReference }) {
  // BottomSheetModal

  const snapPoints = useMemo(() => ['25%', '30%'], [])
  const handleSheetChanges = useCallback((index) => {
    console.debug('handleSheetChanges', index)
  }, [])
  const handleClose = useCallback(() => {
    bottomSheetModalReference.current?.dismiss()
    return true
  }, [])

  BackHandler.addEventListener('hardwareBackPress', handleClose)

  return (
    <BottomSheetModal
      ref={bottomSheetModalReference}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={tw`bg-neutral-900`}
      backgroundStyle={tw`bg-neutral-800`}
      handleIndicatorStyle={tw`bg-neutral-50`}
    >
      <View style={tw`mx-auto`}>
        <Text style={tw`font-semibold text-xl text-neutral-50 text-center`}>Añadir registro</Text>
        <View onTouchEnd={handleClose} style={tw`flex flex-row mt-3`}>
          <MoodButton color='green' text='Positivo' />
          <MoodButton color='red' text='Negativo' />
        </View>
      </View>
    </BottomSheetModal>
  )
}

function TabBar ({ bottomSheet, descriptors, navigation, state }) {
  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present()
  }, [])

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : (options.title !== undefined
              // eslint-disable-next-line indent
              ? options.title
              // eslint-disable-next-line indent
              : route.name)

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress'
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ merge: true, name: route.name })
          }
        }

        const onAddPress = () => {
          if (!isFocused) { handlePresentModalPress() }
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={route.name.toLowerCase() === 'add' ? onAddPress : onPress}
            onLongPress={onPress}
            style={tw`flex-1 bg-neutral-800 p-2 border-t border-neutral-700`}
          >
            <Icon
              icon={TabIcons[route.name.toLowerCase()]}
              style={tw`${isFocused ? 'text-neutral-50' : 'text-neutral-300'} text-center m-auto`}
              size={20}
            />
            {isFocused &&
              <Text style={tw`
              text-center
              ${isFocused ? 'text-neutral-50' : 'text-neutral-300'}
              `}
              >
                {label}
              </Text>}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const Navigator = ({ bottomSheet }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={properties => <TabBar {...properties} bottomSheet={bottomSheet} />}
        screenOptions={({ route }) => ({
          headerBackgroundContainerStyle: tw`border-b border-neutral-800`,
          headerStyle: tw`bg-neutral-900`,
          headerTintColor: tw.color('neutral-50'),
          safeAreaInsets: { top: 0 },
          tabBarActiveTintColor: tw.color('neutral-100'),
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Icon
                icon={TabIcons[route.name.toLowerCase()]}
                style={focused ? tw`text-neutral-50` : tw`text-neutral-300`}
                size={size}
              />
            )
          },
          tabBarInactiveTintColor: tw.color('neutral-400'),
          tabBarStyle: tw`bg-neutral-800`
        })}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity style={tw`p-5`}>
                <Icon icon='circle-plus' size={24} color='white' />
              </TouchableOpacity>
            )
          }}
        />
        <Tab.Screen name='Add' component={Home} />
        <Tab.Screen name='Historic' component={TestScreen} />
        <Tab.Screen name='Settings' component={TestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App () {
  const bottomSheetModalReference = useRef(null)
  return (
    <BottomSheetModalProvider>
      <BottomSheet reference={bottomSheetModalReference} />
      <Navigator bottomSheet={bottomSheetModalReference} />
    </BottomSheetModalProvider>
  )
}
