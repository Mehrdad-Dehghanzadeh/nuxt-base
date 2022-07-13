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
  if (typeof obj == 'object') {
    return Object.keys(obj).length === 0
  } else {
    throw 'input value must be object'
  }
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

/**
 *
 ************************/
export function removeItemOfArray(array, index) {
  if (index > -1) {
    const newArray = array.splice(index, 1)
    return newArray // 2nd parameter means remove one item only
  }
}

/**
 * Removing null value from model
 * ***********************************/
export const shake = (param) => {
  const obj = { ...{}, ...param }
  keys(obj).forEach((k) => !obj[k] && obj[k] !== false && delete obj[k])
  return obj
}

/**
 * Merge two object (without adding second object property)
 * ***********************************/
export const merge = function (obj1, obj2) {
  const obj3 = {}
  for (const prop in obj1) {
    obj3[prop] = obj2[prop]
  }

  return obj3
}
