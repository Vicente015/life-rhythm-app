/* eslint-disable sort/imports */
import React, { useEffect, useState } from 'react'
import {
  Dimensions, Text, View
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import tw from 'twrnc'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import storage from '../database'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

/** @type {import('react-native-chart-kit/dist/HelperTypes').ChartConfig} */
const chartConfig = {
  backgroundGradientFrom: tw.color('green-300'),
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: tw.color('green-500'),
  backgroundGradientToOpacity: 1,
  color: () => 'white',
  decimalPlaces: false,
  propsForDots: {
    r: 5,
    stroke: 'white',
    strokeOpacity: 0.2,
    strokeWidth: 8
  },
  style: { borderRadius: 16 }
}

const Chart = () => {
  /** @type {[{ date: number, value: number }[]]} */
  const [records] = useMMKVStorage('records', storage, [])
  const [groupedData, setGroupedData] = useState([])
  const [unit] = useMMKVStorage('unit', storage, 'week')
  const [labels, setLabels] = useState([])

  // ? Group, sort and sum records
  const groupRecords = () => {
    // ? Group by day
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD')
    const daysRecorded = [...new Set(records.map(record => formatDate(record.date)))]

    let grouped = daysRecorded
      .map(day => records.filter(record => formatDate(record.date) === day))
      .filter(group => !group.includes()) // Remove undefined in array

    // ? Filter
    /**
     * @param {Date} date
     * @param {import('dayjs').UnitType} unit
     * @returns
     */
    const filterDate = (date, unit) => unit === 'all' ? true : dayjs(date).isBetween(dayjs(), dayjs().subtract(1, unit))

    grouped = grouped
      .filter(group => filterDate(group[0].date, unit))

    // ? Convert all dates to unix ms
    grouped = grouped.map(group => group.map((record) => ({ ...record, date: dayjs(record.date).valueOf() })))

    // ? Sort older > new
    grouped = grouped.sort((a, b) => a[0].date > b[0].date)
    setLabels(grouped.map(group => formatDate(group[0].date)))

    // ? Sum all values from days
    grouped = grouped
      .map(group => group.map(record => record.value))
      .map(group => {
        let point = 0
        for (const value of group) {
          value === 0 ? point-- : point++
        }
        return point
      })

    setGroupedData(grouped)
  }
  useEffect(() => {
    if (records.length > 1) groupRecords()
  }, [records, unit])

  // TODO: Por alguna razón hay espacio a la derecha del chart que no se puede quitar, el de la izquierda de pudo con el paddingRight
  // https://github.com/indiespirit/react-native-chart-kit/issues/148
  return (
    <View style={tw`mx-5 mt-3`}>
      <Text style={tw`text-white text-lg font-semibold`}>Ritmo de la última semana</Text>
      <LineChart
        data={{
          datasets: [
            { color: (opacity = 1) => 'white', data: groupedData }
          ],
          labels
        }}
        style={{
          borderRadius: 16,
          marginVertical: 10,
          paddingRight: 40
        }}
        width={Dimensions.get('window').width - 40}
        height={200}
        withHorizontalLabels
        withVerticalLabels
        withShadow={false}
        withOuterLines={false}
        withInnerLines={false}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  )
}

export default Chart
