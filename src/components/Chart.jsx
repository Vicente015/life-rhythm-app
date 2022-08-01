import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import React, { useEffect, useState } from 'react'
import {
  Dimensions, View
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import tw from 'twrnc'

import storage from '../database'

/** @type {import('react-native-chart-kit/dist/HelperTypes').ChartConfig} */
const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => 'white',
  decimalPlaces: false
}
dayjs.extend(isBetween)

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

    //! console.debug('grouped 1', grouped, daysRecorded)
    // ? Filter
    /**
     * @param {Date} date
     * @param {import('dayjs').UnitType} unit
     * @returns
     */
    const filterDate = (date, unit) => unit === 'all' ? true : dayjs(date).isBetween(dayjs(), dayjs().subtract(1, unit))

    grouped = grouped
      .filter(group => filterDate(group[0].date, unit))
    //! console.debug('grouped 2', grouped, unit)

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

    //! console.debug('grouped 3', grouped)
    setGroupedData(grouped)
  }
  useEffect(() => {
    if (records.length > 1) groupRecords()
  }, [records, unit])

  // !console.debug('filter', dateFilter)
  return (
    <View style={tw`bg-neutral-700 flex mx-5 rounded-2xl border-solid border-4 border-neutral-900`}>
      <LineChart
        data={{
          datasets: [
            {
              color: (opacity = 1) => 'white',
              data: groupedData
            }
          ],
          labels
        }}
        style={tw`mx-[-30]`}
        width={Dimensions.get('window').width}
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
