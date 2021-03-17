<template>
  <div class="com-container">
    <div
      @mouseenter="endInterval"
      @mouseleave="startInterval"
      ref="seller"
      class="com-chart"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { dataType } from '@/types/types'
// 引入主题
import '/static/theme/chalk'

@Component
export default class Seller extends Vue {
  // echarts对象
  private chartInstance: any = null
  // 全部的数据
  private chartData: dataType[] = []
  // 总页数
  private totalPage = 0
  // 页码
  public currentPage = 1
  // 每页显示的数量
  public pageSize = 5
  // 每隔多久更新数据的，定时器时间
  private UPDATE_TIME = 3000
  // 定时器对象
  private intervalTimerId = 0
  // echarts挂载的DOM节点
  private echartsDOM: HTMLElement = {} as HTMLElement

  mounted(): void {
    this.initChart()
    this.getData()
    this.resizeRender()
    window.addEventListener('resize', this.resizeRender)
  }

  destroy(): void {
    // 组件销毁的时候，清除定时器
    this.endInterval()
    // 组件销毁的时候，清除事件
    window.removeEventListener('resize', this.resizeRender)
  }

  // 浏览器大小发生变化时触发
  resizeRender(): void {
    const titleFontSize = (this.echartsDOM.offsetWidth / 100) * 3.6
    // 分辨率大小相关配置
    const option = {
      title: {
        textStyle: {
          fontSize: titleFontSize
        }
      },
      tooltip: {
        axisPointer: {
          lineStyle: {
            width: titleFontSize
          }
        }
      },
      series: {
        barWidth: titleFontSize,
        itemStyle: {
          borderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
        }
      }
    }
    this.chartInstance.setOption(option)
    this.chartInstance.resize()
  }

  // 获取接口数据
  async getData(): Promise<void> {
    const res = await this.$axios.get('/seller')
    if (res.data.code === 404) {
      console.error(res.data.message)
    }
    this.chartData = res.data
    this.totalPage = Math.ceil(this.chartData.length / this.pageSize)
    // 获取到数据之后更新视图
    this.updateChart()
    this.startInterval()
  }

  // 初始化echarts实例
  private initChart(): void {
    this.echartsDOM = this.$refs.seller as HTMLElement
    this.chartInstance = this.$echarts.init(this.echartsDOM, 'chalk')
    this.initCharData()
  }

  // 初始化echarts的选项配置
  initCharData(): void {
    const { names, values } = this.getShowData()
    const option = {
      title: {
        text: '▎商家销售统计',
        left: 40,
        top: 20
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true // 距离是包括坐标轴上的位置
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: names
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          z: 0,
          lineStyle: {
            type: 'solid',
            color: '#2d3443'
          }
        }
      },
      series: {
        type: 'bar',
        data: values,
        label: {
          show: true,
          position: 'right',
          color: 'white'
        },
        itemStyle: {
          /*
          // 方法一
          color: {
            type: 'linear',
            x:0,
            y:0,
            x2:1,
            y2:0,
            colorStops: [
              {
                offset: 0, color: '#5053ee'
              },
              {
                offset: 1, color: '#ab6ee5'
              }
            ]
          }
          */
          color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#5053ee'
            },
            {
              offset: 1,
              color: '#ab6ee5'
            }
          ])
        }
      }
    }
    this.chartInstance.setOption(option)
  }

  // 定时更新数据
  startInterval(): void {
    this.intervalTimerId && this.endInterval()
    this.intervalTimerId = setInterval(() => {
      this.currentPage++
      this.updateChart()
      // 如果是最后一页，则从0重新开始
      if (this.currentPage >= this.totalPage) this.currentPage = 0
    }, this.UPDATE_TIME)
  }

  // 关闭定时器
  endInterval(): void {
    clearInterval(this.intervalTimerId)
    this.intervalTimerId = 0
  }

  // 获取需要显示的数据
  getShowData(): { values: number[]; names: string[] } {
    const values: number[] = []
    const names: Array<string> = []
    const start = (this.currentPage - 1) * this.pageSize
    const end = this.currentPage * this.pageSize
    // 截取需要显示的数据
    const showData = this.chartData.slice(start, end)
    showData.forEach(item => {
      values.push(item.value)
      names.push(item.name)
    })
    values.sort((a, b) => a - b)
    return { values, names }
  }

  // 更新echarts数据
  updateChart(): void {
    const { names, values } = this.getShowData()
    const option = {
      yAxis: {
        data: names
      },
      series: {
        data: values
      }
    }
    this.chartInstance.setOption(option)
  }
}
</script>
