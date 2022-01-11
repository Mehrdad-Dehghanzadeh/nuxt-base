/**
 *  Deep Freeze Object
 ***********************/
export function deepFreeze(obj) {
  Object.freeze(obj)
  if (obj === undefined) {
    return obj
  }

  Object.getOwnPropertyNames(obj).forEach(function (prop) {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop])
    }
  })

  return obj
}

/**
 *  Check Object Is Empty
 ***************************/
export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

/**
 *  Convert Object To Array
 ***************************/
export function objectToArray(obj) {
  return !isEmpty(obj)
    ? Object.entries(obj).map(([key, value]) => {
        return { [key]: value }
      })
    : []
}

/**
 * Deep Clone Object
 ************************/
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
