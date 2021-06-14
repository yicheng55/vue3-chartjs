import {PropType} from 'vue'
import {Chart, ChartData, ChartOptions, ChartType, Plugin} from "chart.js";

type PluginArray = Plugin[]

export default interface ChartOptionsType {
  type: ChartType,
  data: ChartData,
  options: ChartOptions,
  plugins: PluginArray
}

export interface ChartJSState {
  chart: Chart | null,
  plugins: PluginArray,
  props: ChartOptionsType
}

export interface InstallOptions {
  plugins?: PluginArray
}

export type TypeProp = PropType<ChartType>
export type DataProp = PropType<ChartData>
export type OptionsProp = PropType<ChartOptions>
export type PluginsProp = PropType<PluginArray>
export type Emit = (event: string, args: Event) => void
export type ChartJSEventHandler = () => boolean
