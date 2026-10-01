import type { App } from 'vue'
import OBackground from './components/Background/Background.vue'
import OBadge from './components/Badge/Badge.vue'
import OBarChart from './components/BarChart/BarChart.vue'
import OButton from './components/Button/Button.vue'
import OCard from './components/Card/Card.vue'
import ODialog from './components/Dialog/Dialog.vue'
import OField from './components/Field/Field.vue'
import OInput from './components/Input/Input.vue'
import OKbd from './components/Kbd/Kbd.vue'
import OKeyCapture from './components/KeyCapture/KeyCapture.vue'
import OPips from './components/Pips/Pips.vue'
import OProgress from './components/Progress/Progress.vue'
import OSelect from './components/Select/Select.vue'
import OSparkline from './components/Sparkline/Sparkline.vue'
import OStat from './components/Stat/Stat.vue'
import OSurface from './components/Surface/Surface.vue'
import OTable from './components/Table/Table.vue'
import OTabs from './components/Tabs/Tabs.vue'
import OToaster from './components/Toast/Toaster.vue'
import OToggle from './components/Toggle/Toggle.vue'
import OTooltip from './components/Tooltip/Tooltip.vue'
import './styles/tokens.css'
import './styles/base.css'

export { dismissToast, toast } from './components/Toast/toast'
export { hotkeyLabel, useHotkey } from './composables/useHotkey'
export { OBackground, OBadge, OBarChart, OButton, OCard, ODialog, OField, OInput, OKbd, OKeyCapture, OPips, OProgress, OSelect, OSparkline, OStat, OSurface, OTable, OTabs, OToaster, OToggle, OTooltip }

const components = { OBackground, OBadge, OBarChart, OButton, OCard, ODialog, OField, OInput, OKbd, OKeyCapture, OPips, OProgress, OSelect, OSparkline, OStat, OSurface, OTable, OTabs, OToaster, OToggle, OTooltip }

/** `app.use(oyna)` registers every component globally. */
export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components))
      app.component(name, component)
  },
}

declare module 'vue' {
  interface GlobalComponents {
    OBackground: typeof OBackground
    OBadge: typeof OBadge
    OBarChart: typeof OBarChart
    OButton: typeof OButton
    OCard: typeof OCard
    ODialog: typeof ODialog
    OField: typeof OField
    OInput: typeof OInput
    OKbd: typeof OKbd
    OKeyCapture: typeof OKeyCapture
    OPips: typeof OPips
    OProgress: typeof OProgress
    OSelect: typeof OSelect
    OSparkline: typeof OSparkline
    OStat: typeof OStat
    OSurface: typeof OSurface
    OTable: typeof OTable
    OTabs: typeof OTabs
    OToaster: typeof OToaster
    OToggle: typeof OToggle
    OTooltip: typeof OTooltip
  }
}
