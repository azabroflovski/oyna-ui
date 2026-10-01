// A small driver for headless Chrome over its debugging protocol: enough to open a page, click,
// press keys, take screenshots and run code in it. Used by scripts/check.ts; no test runner needed.
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chromePath = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 9333

export async function launch() {
  const chrome = Bun.spawn(
    [
      chromePath,
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${mkdtempSync(join(tmpdir(), 'oyna-chrome-'))}`,
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdout: 'ignore', stderr: 'ignore' },
  )

  // Chrome needs a moment before it answers
  let target: { webSocketDebuggerUrl: string } | undefined
  for (let attempt = 0; attempt < 50 && !target; attempt++) {
    await Bun.sleep(100)
    target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
      .then((response) => response.json() as Promise<{ webSocketDebuggerUrl: string }>)
      .catch(() => undefined)
  }
  if (!target) throw new Error('Chrome did not start')

  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }))

  let lastId = 0
  const waiting = new Map<number, (result: any) => void>()
  const listeners = new Set<(method: string) => void>()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data))
    if (message.id) {
      if (message.error) throw new Error(`${message.error.message}`)
      waiting.get(message.id)?.(message.result)
      waiting.delete(message.id)
    } else {
      for (const listener of listeners) listener(message.method)
    }
  })

  function send(method: string, params: object = {}): Promise<any> {
    const id = ++lastId
    socket.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve) => waiting.set(id, resolve))
  }

  const once = (method: string) =>
    new Promise<void>((resolve) => {
      const listener = (name: string) => {
        if (name !== method) return
        listeners.delete(listener)
        resolve()
      }
      listeners.add(listener)
    })

  await send('Page.enable')
  await send('Runtime.enable')

  /** Runs an expression in the page and returns its value (a promise is awaited). */
  async function evaluate<T = unknown>(expression: string): Promise<T> {
    const { result, exceptionDetails } = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text)
    return result.value
  }

  /** The middle of the first element matching the selector, scrolled into view. */
  async function centre(selector: string) {
    const point = await evaluate<{ x: number; y: number } | null>(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)})
      if (!el) return null
      el.scrollIntoView({ block: 'center' })
      const box = el.getBoundingClientRect()
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
    })()`)
    if (!point) throw new Error(`No element matches ${selector}`)
    return point
  }

  return {
    evaluate,
    /** `mobile` makes it a phone: touch, and a width Chrome's window cannot go down to by itself. */
    async size(width: number, height: number, mobile = false) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
    },
    async goto(url: string) {
      const loaded = once('Page.loadEventFired')
      await send('Page.navigate', { url })
      await loaded
      // fonts and the first paint of the app
      await evaluate('document.fonts.ready.then(() => new Promise(r => setTimeout(r, 400)))')
    },
    async hover(selector: string) {
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...(await centre(selector)) })
    },
    /** A real mouse click, so components that open on pointer events open too. */
    async click(selector: string) {
      const point = await centre(selector)
      const button = { button: 'left', clickCount: 1, ...point }
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point })
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...button })
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...button })
    },
    /** Presses a physical key, e.g. `KeyD`, `Escape`, `Enter`. */
    async press(code: string) {
      const key = code.replace(/^Key/, '').toLowerCase()
      await send('Input.dispatchKeyEvent', { type: 'keyDown', code, key })
      await send('Input.dispatchKeyEvent', { type: 'keyUp', code, key })
    },
    wait: (ms: number) => Bun.sleep(ms),
    async screenshot(file: string) {
      const { data } = await send('Page.captureScreenshot', { format: 'png' })
      await Bun.write(file, Buffer.from(data, 'base64'))
    },
    close() {
      socket.close()
      chrome.kill()
    },
  }
}
