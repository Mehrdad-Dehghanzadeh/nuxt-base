import { mouseEvent } from '@helpers/utils'

const LongClick = {
  bind(el, { value }, VNode) {
    if (!value.active) {
      return
    }

    if (typeof value.handler !== 'function') {
      // eslint-disable-next-line no-console
      console.warn(`Expect a function, got ${value.handler}`)
      return
    }

    const canselEvent = [mouseEvent.end, mouseEvent.move]

    let pressTimer = null

    const start = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value.handler(e), 500)

        canselEvent.forEach((e) => el.addEventListener(e, cancel))
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null

        canselEvent.forEach((e) => el.removeEventListener(e, cancel))
      }
    }

    el.addEventListener(mouseEvent.start, start)
  },
  unbind(el) {}
}

export default LongClick
