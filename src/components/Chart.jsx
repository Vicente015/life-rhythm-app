import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import {
  Dimensions, View
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import tw from 'twrnc'

import storage from '../database'

// ! Fake data just for testing
/* storage.setArray('records', [
  { date: '26-07-2022', value: 1 },
  { date: '25-07-2022', value: 1 },
  { date: '24-07-2022', value: 1 },
  { date: '23-07-2022', value: 1 },
  { date: '22-07-2022', value: 1 },
  { date: '21-07-2022', value: 0 },
  { date: '20-07-2022', value: 0 },
  { date: '19-07-2022', value: 0 },
  { date: '18-07-2022', value: 1 },
  { date: '17-07-2022', value: 0 },
  { date: '16-07-2022', value: 0 },
  { date: '15-07-2022', value: 1 }
])
*/

/** @type {import('react-native-chart-kit/dist/HelperTypes').ChartConfig} */
const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => 'white',
  decimalPlaces: false
}

const Chart = () => {
  /** @type {[{ date: string, value: number }[]]} */
  const [records] = useMMKVStorage('records', storage, [])
  const [groupedData, setGroupedData] = useState([])

  console.debug('chart', records, groupedData)
  // ? Group, sort and sum records
  const groupRecords = () => {
    let groupedRecords = []
    const time = 5

    console.debug('0', records)
    for (let record in records) {
      record = Number.parseInt(record)
      if ((record % time) === 0) groupedRecords.push([records[record], records[record + 1], records[record + 2]])
    }

    console.debug('1', groupedRecords)
    groupedRecords = groupedRecords
      // eslint-disable-next-line unicorn/no-array-reduce
      .filter(group => !group.includes())
      .map(group => group.map(record => record.value).reduce((previous, current) => previous + current))

    // console.debug('2', groupedRecords)

    // groupedRecords = groupedRecords.map(sumedValues => Math.floor(sumedValues / time))
    // console.debug('3', groupedRecords)
    setGroupedData(groupedRecords)
  }
  useEffect(() => {
    if (records.length > 1) groupRecords()
  }, [records])

  return (
    <View style={tw`bg-neutral-700 flex mx-5 rounded-2xl border-solid border-4 border-neutral-900`}>
      <LineChart
        data={{
          datasets: [
            {
              color: (opacity = 1) => 'white',
              data: groupedData // optional
            }
          ],
          labels: []
        }}
        style={tw`mx-[-30]`}
        width={Dimensions.get('window').width}
        height={200}
        withHorizontalLabels
        withVerticalLabels={false}
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
