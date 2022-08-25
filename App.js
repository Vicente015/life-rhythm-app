/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable sort/imports */
import React, { useCallback, useRef, useState } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import tw from 'twrnc'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faCaretDown, faChartPie, faCirclePlus, faGear, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'

// * Screens
import Home from './src/pages/Home'

// * Components
import MoodButton from './src/components/MoodButton'
import DatePicker from 'react-native-date-picker'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
library.add(faHome, faGear, faCirclePlus, faChartPie, faHeart, faCalendar, faCaretDown)

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
  const [snapPoints, setSnapPoints] = useState(['5%', '25%'])
  const [date, setDate] = useState(new Date())
  const [selectableDate, setSelectableDate] = useState(false)

  const onDateChange = useCallback((date) => {
    setDate(date)
    setSelectableDate(false)
    setSnapPoints(['50%', '25%'])
    console.debug('date change')
  }, [])
  const onCurrentDatePress = useCallback(() => {
    setSelectableDate(true)
    setSnapPoints(['25%', '50%'])
    console.debug('current date press')
  }, [])
  const handleSheetChanges = useCallback((index) => {
    console.debug('handleSheetChanges', index)
  }, [])
  const handleClose = useCallback(() => {
    bottomSheetModalReference.current?.dismiss()
    setSelectableDate(false)
    setSnapPoints(['5%', '25%'])
    console.debug('close')
    return true
  }, [])
  BackHandler.addEventListener('hardwareBackPress', handleClose)

  /**
   * @param {string} string
   * @returns {string}
   * @link https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
   */
  const upperFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <BottomSheetModal
      ref={bottomSheetModalReference}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={tw`bg-neutral-900`}
      backgroundStyle={tw`bg-neutral-800`}
      handleIndicatorStyle={tw`bg-neutral-50`}
      enableDismissOnClose
    >
      <BottomSheetView style={tw`mx-auto`}>
        <Text style={tw`font-semibold text-xl text-neutral-50 text-center`}>Añadir registro</Text>
        {selectableDate
          ? <DatePicker
            date={date}
            onDateChange={onDateChange}
            minimumDate={dayjs().subtract(3, 'month').toDate()}
            maximumDate={dayjs().toDate()}
            mode='date'
            textColor={tw.color('neutral-50')}
            fadeToColor='none'
            style={tw`m-0 p-0`}
          />
          : <TouchableOpacity style={tw`flex flex-row justify-center items-center`} onPress={onCurrentDatePress}>
            <Icon icon='calendar' size={18} color={tw.color('neutral-200')} style={tw`mr-1`} />
            <Text style={tw`text-neutral-200 text-base`}>{`${dayjs().diff(date, 'days') > 0 ? upperFirstLetter(dayjs(date).locale('es').fromNow(false)) : 'Hoy'}, ${dayjs(date).locale('es').format('DD MMMM')}`}</Text>
            <Icon icon='caret-down' color={tw.color('neutral-200')} style={tw`mr-1`} />
          </TouchableOpacity>}
        <View onTouchEnd={handleClose} style={tw`flex flex-row mt-3`}>
          <MoodButton color='green' text='Positivo' date={date} />
          <MoodButton color='red' text='Negativo' date={date} />
        </View>
      </BottomSheetView>
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
        <Tab.Screen name='Home' component={Home} />
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
