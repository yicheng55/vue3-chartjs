import Vue3ChartJs from './Vue3ChartJs'
import { Chart, Plugin } from 'chart.js'
import {App} from "vue";
import {InstallOptions} from "./types";

Vue3ChartJs.registerGlobalPlugins = (plugins: Plugin[]) => {
  Chart.register(...plugins)
}

Vue3ChartJs.install = (app: App, options: InstallOptions = {}) => {
  app.component(Vue3ChartJs.name, Vue3ChartJs)

  if (options?.plugins?.length) {
    Vue3ChartJs.registerGlobalPlugins(options.plugins)
  }
}

export default Vue3ChartJs