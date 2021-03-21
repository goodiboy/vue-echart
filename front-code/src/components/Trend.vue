<template>
  <div class="com-container">
    <div ref="trend" class="com-chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as echarts from 'echarts/core'
import { LineSeriesOption } from 'echarts/charts'
import {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption
} from 'echarts/components'
// 引入主题
import '/static/theme/chalk'
import { TrendData, TrendOptionData } from '@/types/types'

type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | GridComponentOption
  | (LegendComponentOption & { icon?: string })
  | TooltipComponentOption
>

type valuesType = { name: string; data: number[] }[]

// trend数据默认值
const trendDefaultData: TrendOptionData = {
  base: 0,
  data: [
    {
      name: '',
      data: []
    }
  ],
  title: '',
  unit: '百'
}
// 半透明的颜色值
const colorArr1 = [
  'rgba(11, 168, 44, 0.5)',
  'rgba(44, 110, 255, 0.5)',
  'rgba(22, 242, 217, 0.5)',
  'rgba(254, 33, 30, 0.5)',
  'rgba(250, 105, 0, 0.5)'
]
// 全透明的颜色值
const colorArr2 = [
  'rgba(11, 168, 44, 0)',
  'rgba(44, 110, 255, 0)',
  'rgba(22, 242, 217, 0)',
  'rgba(254, 33, 30, 0)',
  'rgba(250, 105, 0, 0)'
]

@Component
export default class Trend extends Vue {
  // echarts实例
  private myEcharts?: echarts.ECharts

  // 后台返回数据
  private chartData: TrendData = {
    commodity: trendDefaultData,
    common: {
      month: []
    },
    map: trendDefaultData,
    seller: trendDefaultData,
    type: [
      {
        key: 'map',
        text: ''
      }
    ]
  }

  async mounted() {
    this.myEcharts = echarts.init(this.$refs.trend as HTMLElement, 'chalk')
    await this.getData()
    this.initEcharts()
    this.updateEcharts()
  }

  // 获取图表数据
  async getData(): Promise<void> {
    const res = await this.$axios.get('/trend')
    if (res.data.code === 404) {
      console.error(res.data.message)
    }
    this.chartData = res.data
  }

  // 初始化echarts
  initEcharts(): void {
    const option: ECOption = {
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      grid: {
        left: '3%',
        top: '35%',
        right: '4%',
        bottom: '1%',
        containLabel: true
      },
      legend: {
        left: 20,
        top: '15%',
        icon: 'circle'
      },
      tooltip: {
        trigger: 'axis'
      }
    }
    this.myEcharts?.setOption(option)
  }

  updateEcharts(): void {
    const { timerArr, seriesArr, legendArr } = this.getShowData()
    const option: ECOption = {
      xAxis: {
        data: timerArr
      },
      series: seriesArr,
      legend: {
        data: legendArr
      }
    }
    this.myEcharts?.setOption(option)
  }

  getShowData(): {
    timerArr: string[]
    values: valuesType
    seriesArr: LineSeriesOption[]
    legendArr: string[]
  } {
    const timerArr = this.chartData.common.month
    const values: valuesType = this.chartData.map.data
    const seriesArr = this.getSeriesData(values)
    const legendArr = this.getLegendData(values)
    return { timerArr, values, seriesArr, legendArr }
  }

  // 获取series数据
  getSeriesData(values: valuesType) {
    return values.map((item, index) => {
      const data: LineSeriesOption = {
        type: 'line',
        stack: 'map',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArr1[index]
            },
            {
              offset: 1,
              color: colorArr2[index]
            }
          ])
        },
        name: item.name,
        data: item.data
      }
      return data
    })
  }
  // 获取legend数据
  getLegendData(values: valuesType): string[] {
    return values.map(item => item.name)
  }
}
</script>
