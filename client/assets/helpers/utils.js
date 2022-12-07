import enums from '@locales/enums'

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
  move: 'mousemove'
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

/**
 * Enum Porvider
 * ****************************************/
export function enumProvider(type, value, prop = 'id') {
  if (type == undefined) {
    const error = new Error('must be enter type')
    console.error(error)
    return error
  }

  if (value === undefined) {
    return enums[type]
  }

  const item = enums[type].find((i) => i[prop] === value)

  return typeof item !== 'undefined' ? item : {}
}

/* File To Base 64
 ***********************************/
export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * currentDate formate yyyy-mm-dd
 * ****************************************/
export function currentDate() {
  let currentDate = new Date(new Date().getTime())
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`
}

/**
 * tomorrow formate yyyy-mm-dd
 * ****************************************/
export function tomorrowDate() {
  let currentDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`
}
