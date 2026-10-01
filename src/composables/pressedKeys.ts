import { reactive } from 'vue'

/** The physical keys held down right now, by `KeyboardEvent.code`. One listener serves every reader. */
const pressed = reactive(new Set<string>())
let listening = false

const normal = (code: string) => (code === 'NumpadEnter' ? 'Enter' : code)

export function usePressedKeys() {
  if (!listening && typeof window !== 'undefined') {
    listening = true
    window.addEventListener('keydown', (event) => pressed.add(normal(event.code)))
    window.addEventListener('keyup', (event) => {
      pressed.delete(normal(event.code))
      // while Cmd is held, macOS sends no keyup for the other keys: letting go of Cmd releases them all
      if (event.code.startsWith('Meta')) pressed.clear()
    })
    // a key released while the window is unfocused never sends keyup
    window.addEventListener('blur', () => pressed.clear())
  }
  return pressed
}
