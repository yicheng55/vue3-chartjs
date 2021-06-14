import {ChartJSEventHandler, Emit} from "./types";

const chartJsEventNames = [
  "install",
  "start",
  "stop",
  'beforeInit',
  'afterInit',
  'beforeUpdate',
  'afterUpdate',
  'beforeElementsUpdate',
  'reset',
  'beforeDatasetsUpdate',
  'afterDatasetsUpdate',
  'beforeDatasetUpdate',
  'afterDatasetUpdate',
  'beforeLayout',
  'afterLayout',
  'afterLayout',
  'beforeRender',
  'afterRender',
  'resize',
  'destroy',
  'uninstall',
  'afterTooltipDraw',
  'beforeTooltipDraw',
];

function generateEventObject(type: string): Event {
  //chart js allows some events to be cancelled if they return false
  return new Event(type, {
    bubbles: false,
    cancelable: true,
  });
}

function generateChartJsEventListener(emit: Emit, event: Event): Record<string, ChartJSEventHandler> {
  return {
    [event.type]: (): boolean => {
      emit(event.type, event)
      return !event.defaultPrevented
    }
  }
}

export {
  chartJsEventNames,
  generateEventObject,
  generateChartJsEventListener,
}
