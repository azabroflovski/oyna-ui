import type { App } from 'vue'
import OBackground from './components/Background/Background.vue'
import OBadge from './components/Badge/Badge.vue'
import OBarChart from './components/BarChart/BarChart.vue'
import OButton from './components/Button/Button.vue'
import OCard from './components/Card/Card.vue'
import OCheckbox from './components/Checkbox/Checkbox.vue'
import ODialog from './components/Dialog/Dialog.vue'
import OField from './components/Field/Field.vue'
import OInput from './components/Input/Input.vue'
import OKbd from './components/Kbd/Kbd.vue'
import OKeyCapture from './components/KeyCapture/KeyCapture.vue'
import OMenu from './components/Menu/Menu.vue'
import OPips from './components/Pips/Pips.vue'
import OPopover from './components/Popover/Popover.vue'
import OProgress from './components/Progress/Progress.vue'
import ORadio from './components/Radio/Radio.vue'
import OSelect from './components/Select/Select.vue'
import OSparkline from './components/Sparkline/Sparkline.vue'
import OStat from './components/Stat/Stat.vue'
import OSurface from './components/Surface/Surface.vue'
import OSwitch from './components/Switch/Switch.vue'
import OTable from './components/Table/Table.vue'
import OTabs from './components/Tabs/Tabs.vue'
import OTextarea from './components/Textarea/Textarea.vue'
import OToaster from './components/Toast/Toaster.vue'
import OToggle from './components/Toggle/Toggle.vue'
import OTooltip from './components/Tooltip/Tooltip.vue'
import './styles/tokens.css'
import './styles/base.css'

export type { MenuItem } from './components/Menu/Menu.vue'
export { dismissToast, toast } from './components/Toast/toast'
export { hotkeyLabel, useHotkey } from './composables/useHotkey'
export { OBackground, OBadge, OBarChart, OButton, OCard, OCheckbox, ODialog, OField, OInput, OKbd, OKeyCapture, OMenu, OPips, OPopover, OProgress, ORadio, OSelect, OSparkline, OStat, OSurface, OSwitch, OTable, OTabs, OTextarea, OToaster, OToggle, OTooltip }

const components = { OBackground, OBadge, OBarChart, OButton, OCard, OCheckbox, ODialog, OField, OInput, OKbd, OKeyCapture, OMenu, OPips, OPopover, OProgress, ORadio, OSelect, OSparkline, OStat, OSurface, OSwitch, OTable, OTabs, OTextarea, OToaster, OToggle, OTooltip }

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
    OCheckbox: typeof OCheckbox
    ODialog: typeof ODialog
    OField: typeof OField
    OInput: typeof OInput
    OKbd: typeof OKbd
    OKeyCapture: typeof OKeyCapture
    OMenu: typeof OMenu
    OPips: typeof OPips
    OPopover: typeof OPopover
    OProgress: typeof OProgress
    ORadio: typeof ORadio
    OSelect: typeof OSelect
    OSparkline: typeof OSparkline
    OStat: typeof OStat
    OSurface: typeof OSurface
    OSwitch: typeof OSwitch
    OTable: typeof OTable
    OTabs: typeof OTabs
    OTextarea: typeof OTextarea
    OToaster: typeof OToaster
    OToggle: typeof OToggle
    OTooltip: typeof OTooltip
  }
}
