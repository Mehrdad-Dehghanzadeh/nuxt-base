/**
 * Debounce
 * ***********************************/
export const debounce = (fn, wait) => {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, arguments), wait)
  }
}

/**
 * Global variables & computation
 * ***********************************/
let isTouch = false

const events = {
  start: 'mousedown',
  end: 'mouseup',
  move: 'mousemove',
}

if (process.client) {
  isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  if (isTouch) {
    events.start = 'touchstart'
    events.end = 'touchend'
    events.move = 'touchmove'
  }
}

/**
 * Detect touch devide support
 * ***********************************/
export const isTouchDevice = isTouch

/**
 * Events inaccording to touch device support
 * ***********************************/
export const mouseEvent = events

/**
 * Encoding base-64
 * ***********************************/
export const encode = (str) => {
  return Buffer.from(str).toString('base64')
}

/**
 * Decoding base-64
 * ***********************************/
export const decode = (str) => {
  return Buffer.from(str, 'base64').toString()
}
