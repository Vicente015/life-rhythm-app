import React from 'react'
import {
  Dimensions, View
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import tw from 'twrnc'

/* storage.setArray('records', {
  // eslint-disable-next-line sort/object-properties
  key: 'records',
  data: [
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
  ]
}) */

/** @type {import('react-native-chart-kit/dist/HelperTypes').ChartConfig} */
const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`
}

export default class ChartComponent extends React.Component {
  state = { data: [0, 1, 0] }

  constructor () {
    super()
    this.getData()
  }

  getData () {
    /** @type {{ date: string, value: number }[]} */
    /* const records = storage.getArray('records')
    let groupedRecords = []
    const time = 3
    for (let record in records) {
      record = Number.parseInt(record)
      if ((record % time) === 0) groupedRecords.push([records[record], records[record + 1], records[record + 2]])
    }

    groupedRecords = groupedRecords
      // eslint-disable-next-line unicorn/no-array-reduce
      .map(group => group.map(record => record.value).reduce((previous, current) => current === 0 ? previous - 1 : previous + current))
      .map(sumedValues => Math.floor(sumedValues / time))

    console.debug(groupedRecords)
    this.setState(groupedRecords)
    */
  }

  render () {
    return (
      <View style={tw`bg-neutral-700 flex mx-5 rounded-2xl border-solid border-4 border-neutral-900`}>
        <LineChart
          data={{
            datasets: [
              {
                color: (opacity = 1) => 'white',
                data: this.state.data // optional
              }
            ],
            labels: ['yea', 'owo', 'awa', 'uwuwuwu', 'ajo']
          }}
          style={tw`mx-[-50]`}
          width={Dimensions.get('window').width}
          height={200}
          withHorizontalLabels={false}
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
}
