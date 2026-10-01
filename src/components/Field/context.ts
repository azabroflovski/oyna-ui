import type { ComputedRef, InjectionKey } from 'vue'

/** What a field tells the control inside it, so the label and the message are tied to it. */
export interface FieldContext {
  id: string
  messageId: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
}

export const fieldKey: InjectionKey<FieldContext> = Symbol('o-field')
