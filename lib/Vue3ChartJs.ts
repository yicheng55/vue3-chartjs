import {h, ref, onMounted, defineComponent} from 'vue'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  UpdateMode
} from 'chart.js'
import {chartJsEventNames, generateEventObject, generateChartJsEventListener} from './includes'
import {ChartJSState, DataProp, OptionsProp, PluginsProp, TypeProp} from "./types";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
)

const Vue3ChartJs = defineComponent({
  name: 'Vue3ChartJs',
  props: {
    type: {
      type: String as TypeProp,
      required: true
    },
    data: {
      type: Object as DataProp,
      required: true
    },
    options: {
      type: Object as OptionsProp,
      default: () => ({})
    },
    plugins: {
      type: Array as PluginsProp,
      default: () => []
    }
  },
  emits: chartJsEventNames,
  setup(props, {emit}) {
    const chartRef = ref<HTMLCanvasElement | null>(null)

    //generate chart.js plugin to emit lib events
    const chartJsEventsPlugin = chartJsEventNames
        .reduce((reduced, eventType) => {
          const event = generateEventObject(eventType)
          return {
            ...reduced,
            ...generateChartJsEventListener(emit, event)
          }
        }, {id: 'Vue3ChartJsEventHookPlugin'})

    const chartJSState: ChartJSState = {
      chart: null,
      plugins: [
        chartJsEventsPlugin,
        ...props.plugins
      ],
      props: {...props}
    }

    const destroy = () => {
      if (chartJSState.chart) {
        chartJSState.chart.destroy()
        chartJSState.chart = null
        chartRef.value = null
      }
    }

    const update = (mode?: UpdateMode) => {
      if (chartJSState.chart) {
        chartJSState.chart.data = {...chartJSState.chart.data, ...chartJSState.props.data}
        chartJSState.chart.options = {...chartJSState.chart.options, ...chartJSState.props.options}
        chartJSState.chart.update(mode)
      }
    }

    const resize = () => chartJSState.chart && chartJSState.chart.resize()

    const render = () => {
      if (chartJSState.chart) {
        return chartJSState.chart.update()
      }

      return chartJSState.chart = new Chart(
          chartRef.value?.getContext('2d') ?? document.createElement("canvas"),
          {
            type: chartJSState.props.type,
            data: chartJSState.props.data,
            options: chartJSState.props.options,
            plugins: chartJSState.plugins
          }
      )
    }

    onMounted(() => render())

    return {
      chartJSState,
      chartRef,
      render,
      resize,
      update,
      destroy,
    }
  },

  render() {
    return h('canvas', {
      ref: 'chartRef'
    })
  }
})

export default Vue3ChartJs
