/* eslint-disable sort/imports */
import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import tw from 'twrnc'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie, faCirclePlus, faGear, faHome } from '@fortawesome/free-solid-svg-icons'

// # Screens
import Home from './src/pages/Home'
library.add(faHome, faGear, faCirclePlus, faChartPie)

function TestScreen () {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>test</Text>
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

function BottomBar () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerBackgroundContainerStyle: tw`border-b border-neutral-800`,
        headerStyle: tw`bg-neutral-900`,
        headerTintColor: tw.color('neutral-50'),
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
      <Tab.Screen name='Add' component={TestScreen} />
      <Tab.Screen name='Historic' component={TestScreen} />
      <Tab.Screen name='Settings' component={TestScreen} />
    </Tab.Navigator>
  )
}

export default function App () {
  return (
    <NavigationContainer>
      <BottomBar />
    </NavigationContainer>
  )
}
