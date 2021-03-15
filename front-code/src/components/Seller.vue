<template>
  <div class="com-container">
    <div ref="seller" class="com-chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { dataType } from '@/types/types'

@Component
export default class Seller extends Vue {
  private chartInstance: any = null
  private chartData: dataType[] = []

  mounted() {
    this.initChart()
    this.getData()
  }

  async getData() {
    const res = await this.$axios.get('/seller')
    if (res.data.code === 404) {
      console.error(res.data.message)
    }
    this.chartData = res.data
    // 获取到数据之后更新视图
    this.updateChart()
  }

  initChart() {
    this.chartInstance = this.$echarts.init(this.$refs.seller as HTMLElement)
  }

  updateChart() {
    const values: number[] = []
    const names: Array<string> = []
    this.chartData.forEach(item => {
      values.push(item.value)
      names.push(item.name)
    })
    const option = {
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: names
      },
      series: {
        type: 'bar',
        data: values
      }
    }
    this.chartInstance.setOption(option)
  }
}
</script>
