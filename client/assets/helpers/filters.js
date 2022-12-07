import moment from 'moment-jalaali'

/**
 * Roune number
 * ***********************************/
export const round = (num) => {
  if (num % 1 === 0) {
    return num
  }
  return Math.round(num * 100) / 100
}

/**
 * Seperate number by 3-digit format
 * ***********************************/
export const price = (val, currency) => {
  const value = val ? val.toString().replace(/(.)(?=(.{3})+$)/g, '$1,') : 0
  return `${value}${currency ? ` ${currency}` : ''}`
}

/**
 * Seperate credit-card number by 4-digit
 * ***********************************/
export const creditCard = {
  if(val) {
    return val.match(new RegExp('.{1,4}', 'g')).join('-')
  }
}

/**
 * Concat base-url to file path
 * ***********************************/
export const fullPath = (val) => {
  if (val) {
    return process.env.API_URL + (val.indexOf('/') === 0 ? '' : '/') + val
  }
}

/**
 * Determine file size
 * ***********************************/
export const fileSize = (val) => {
  const size = val
  const kilobyte = 1024
  const megabyte = kilobyte * kilobyte

  if (size > megabyte) {
    return round(size / megabyte) + ' مگابایت'
  } else if (size > kilobyte) {
    return round(size / kilobyte) + ' کیلوبایت'
  } else if (size >= 0) {
    return size + ' بایت'
  }

  return 'N/A'
}

/**
 * Format garegorian date to jalali
 * ***********************************/
export const date = (val, isFull) => {
  if (val) {
    return moment(val).format(`jYYYY/jMM/jDD${isFull ? ' - HH:mm' : ''}`)
  }
}

/**
 * Hidden Mask
 ************************************/
export const hiddenMask = (val, start) => {
  if (val && typeof start == 'number') {
    let subStr = val.substr(0, start)
    for (let i = start; i < val.length; i++) {
      subStr = subStr.concat('*')
    }
    return subStr
  }
}

/**
 * Brief text
 ******************************/
export function briefText(val) {
  let text = ''
  if (val.split(' ').length > 1) {
    text = val
      .toString()
      .split(' ')
      .reduce(
        (previousValue, currentValue) => previousValue[0] + currentValue[0]
      )

      .toUpperCase()
  } else if (val.split(' ').length == 1) {
    text = val.toString().substr(0, 2).toUpperCase()
  }

  return text
}

