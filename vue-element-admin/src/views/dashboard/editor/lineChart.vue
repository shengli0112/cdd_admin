<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'
  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions({ month, qiuzu, qiugou, chuzu, chushou  } = {}) {
        this.chart.setOption({
          xAxis: {
            data: month,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['求租', '求购', '出租', '出售'] //'厂房', '土地', '仓库'
          },
          series: [{
            name: '求租', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: qiuzu,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
            {
              name: '求购',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: qiugou,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '出租',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#777777',
                  lineStyle: {
                    color: '#777777',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: chuzu,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '出售',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#f2a3d4',
                  lineStyle: {
                    color: '#f2a3d4',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: chushou,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      }
    }
  }
</script>
