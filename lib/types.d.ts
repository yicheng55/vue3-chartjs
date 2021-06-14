import {PropType} from 'vue'
import {Chart, ChartData, ChartOptions, ChartType, Plugin} from "chart.js";

export default interface ChartOptionsType {
  type: ChartType,
  data: ChartData,
  options: ChartOptions,
  plugins: Plugin[]
}

export interface ChartJSState {
  chart: Chart | null,
  plugins: Plugin[],
  props: ChartOptionsType
}

export type TypeProp = PropType<ChartType>
export type DataProp = PropType<ChartData>
export type OptionsProp = PropType<ChartOptions>
export type PluginsProp = PropType<Plugin[]>
export type Emit = (event: string, args: Event) => void
export type ChartJSEventHandler = () => boolean
