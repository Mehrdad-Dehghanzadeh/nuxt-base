/**
 * Real nationalCode validation
 * ***********************************/
export const checkNationalCode = function (value) {
  if (
    !/^\d{10}$/.test(value) ||
    value === '0000000000' ||
    value === '1111111111' ||
    value === '2222222222' ||
    value === '3333333333' ||
    value === '4444444444' ||
    value === '5555555555' ||
    value === '6666666666' ||
    value === '7777777777' ||
    value === '8888888888' ||
    value === '9999999999'
  ) {
    return false
  }
  const check = parseInt(value[9])
  let sum = 0
  let i
  for (i = 0; i < 9; ++i) {
    sum += parseInt(value[i]) * (10 - i)
  }
  sum %= 11
  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
}

/**
 * legal nationalCode validation
 * ***********************************/
export const checkLegalNationalCode = function (value) {
  if (value.length !== 11 || parseInt(value, 10) === 0) return false

  if (parseInt(value.substr(3, 6), 10) === 0) return false
  const c = parseInt(value.substr(10, 1), 10)
  const d = parseInt(value.substr(9, 1), 10) + 2
  const z = [29, 27, 23, 19, 17]
  let s = 0
  for (let i = 0; i < 10; i++)
    s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5]
  s = s % 11
  if (s === 10) s = 0
  return c === s
}

/**
 * Iban validation
 * ***********************************/
export const checkIban = function (value) {
  const iban = value.replace(/ /g, '').toUpperCase()
  let ibancheckdigits = ''
  let leadingZeroes = true
  let cRest = ''
  let cOperator = ''
  let charAt
  let cChar
  let i
  let p

  if (iban.length < 26) {
    return false
  }

  const ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4)
  for (i = 0; i < ibancheck.length; i++) {
    charAt = ibancheck.charAt(i)
    if (charAt !== '0') {
      leadingZeroes = false
    }
    if (!leadingZeroes) {
      ibancheckdigits += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charAt)
    }
  }

  for (p = 0; p < ibancheckdigits.length; p++) {
    cChar = ibancheckdigits.charAt(p)
    cOperator = '' + cRest + '' + cChar
    cRest = cOperator % 97
  }
  return cRest === 1
}

/**
 * Mobile validation
 * ***********************************/
export const checkMobile = function (value) {
  return /^(09)[0-9]{9}$/i.test(value)
}

/**
 * check zero value
 * ***********************************/

export const noZero = (value) => {
  return Number(value) != 0
}
