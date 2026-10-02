import type { App } from 'vue'

import OAlert from './components/Alert/Alert.vue'
import OAvatar from './components/Avatar/Avatar.vue'
import OBackground from './components/Background/Background.vue'
import OBadge from './components/Badge/Badge.vue'
import OBarChart from './components/BarChart/BarChart.vue'
import OButton from './components/Button/Button.vue'
import OCard from './components/Card/Card.vue'
import OCheckbox from './components/Checkbox/Checkbox.vue'
import OCombobox from './components/Combobox/Combobox.vue'
import OCommand from './components/Command/Command.vue'
import ODialog from './components/Dialog/Dialog.vue'
import OEmpty from './components/Empty/Empty.vue'
import OField from './components/Field/Field.vue'
import OInput from './components/Input/Input.vue'
import OKbd from './components/Kbd/Kbd.vue'
import OKeyCapture from './components/KeyCapture/KeyCapture.vue'
import OMenu from './components/Menu/Menu.vue'
import OPinInput from './components/PinInput/PinInput.vue'
import OPips from './components/Pips/Pips.vue'
import OPopover from './components/Popover/Popover.vue'
import OProgress from './components/Progress/Progress.vue'
import ORadio from './components/Radio/Radio.vue'
import OSelect from './components/Select/Select.vue'
import OSkeleton from './components/Skeleton/Skeleton.vue'
import OSlider from './components/Slider/Slider.vue'
import OSparkline from './components/Sparkline/Sparkline.vue'
import OSpinner from './components/Spinner/Spinner.vue'
import OStat from './components/Stat/Stat.vue'
import OSurface from './components/Surface/Surface.vue'
import OSwitch from './components/Switch/Switch.vue'
import OTable from './components/Table/Table.vue'
import OTabs from './components/Tabs/Tabs.vue'
import OTag from './components/Tag/Tag.vue'
import OTextarea from './components/Textarea/Textarea.vue'
import OTimeline from './components/Timeline/Timeline.vue'
import OToaster from './components/Toast/Toaster.vue'
import OToggle from './components/Toggle/Toggle.vue'
import OTooltip from './components/Tooltip/Tooltip.vue'

import './styles/tokens.css'
import './styles/base.css'

export type { CommandItem } from './components/Command/Command.vue'
export type { MenuItem } from './components/Menu/Menu.vue'
export { dismissToast, toast } from './components/Toast/toast'
export { hotkeyLabel, useHotkey } from './composables/useHotkey'
export {
  OAlert,
  OAvatar,
  OBackground,
  OBadge,
  OBarChart,
  OButton,
  OCard,
  OCheckbox,
  OCombobox,
  OCommand,
  ODialog,
  OEmpty,
  OField,
  OInput,
  OKbd,
  OKeyCapture,
  OMenu,
  OPinInput,
  OPips,
  OPopover,
  OProgress,
  ORadio,
  OSelect,
  OSkeleton,
  OSlider,
  OSparkline,
  OSpinner,
  OStat,
  OSurface,
  OSwitch,
  OTable,
  OTabs,
  OTag,
  OTextarea,
  OTimeline,
  OToaster,
  OToggle,
  OTooltip,
}

const components = {
  OAlert,
  OAvatar,
  OBackground,
  OBadge,
  OBarChart,
  OButton,
  OCard,
  OCheckbox,
  OCombobox,
  OCommand,
  ODialog,
  OEmpty,
  OField,
  OInput,
  OKbd,
  OKeyCapture,
  OMenu,
  OPinInput,
  OPips,
  OPopover,
  OProgress,
  ORadio,
  OSelect,
  OSkeleton,
  OSlider,
  OSparkline,
  OSpinner,
  OStat,
  OSurface,
  OSwitch,
  OTable,
  OTabs,
  OTag,
  OTextarea,
  OTimeline,
  OToaster,
  OToggle,
  OTooltip,
}

/** `app.use(oyna)` registers every component globally. */
export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) app.component(name, component)
  },
}

declare module 'vue' {
  interface GlobalComponents {
    OAlert: typeof OAlert
    OAvatar: typeof OAvatar
    OBackground: typeof OBackground
    OBadge: typeof OBadge
    OBarChart: typeof OBarChart
    OButton: typeof OButton
    OCard: typeof OCard
    OCheckbox: typeof OCheckbox
    OCombobox: typeof OCombobox
    OCommand: typeof OCommand
    ODialog: typeof ODialog
    OEmpty: typeof OEmpty
    OField: typeof OField
    OInput: typeof OInput
    OKbd: typeof OKbd
    OKeyCapture: typeof OKeyCapture
    OMenu: typeof OMenu
    OPinInput: typeof OPinInput
    OPips: typeof OPips
    OPopover: typeof OPopover
    OProgress: typeof OProgress
    ORadio: typeof ORadio
    OSelect: typeof OSelect
    OSkeleton: typeof OSkeleton
    OSlider: typeof OSlider
    OSparkline: typeof OSparkline
    OSpinner: typeof OSpinner
    OStat: typeof OStat
    OSurface: typeof OSurface
    OSwitch: typeof OSwitch
    OTable: typeof OTable
    OTabs: typeof OTabs
    OTag: typeof OTag
    OTextarea: typeof OTextarea
    OTimeline: typeof OTimeline
    OToaster: typeof OToaster
    OToggle: typeof OToggle
    OTooltip: typeof OTooltip
  }
}
