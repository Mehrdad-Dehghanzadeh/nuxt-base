import { extend, configure, setInteractionMode } from 'vee-validate'
import {
  required,
  email,
  length,
  min,
  max,
  min_value,
  max_value,
  between,
  integer,
  regex,
  is,
  size,
  ext,
} from 'vee-validate/dist/rules'
import {
  checkNationalCode,
  checkLegalNationalCode,
  checkIban,
  checkMobile,
  noZero,
} from '@helpers/validate'

/*
 * Extend configuration
 ****************************/
setInteractionMode('eager')

/*
 * Register needed rules
 ****************************/
extend('required', required)
extend('email', email)
extend('integer', integer)
extend('between', between)
extend('length', length)
extend('min', min)
extend('max', max)
extend('min_value', min_value)
extend('max_value', max_value)
extend('regex', regex)
extend('is', is)
extend('size', size)
extend('ext', ext)

/*
 * Register custom rules
 ****************************/
extend('nationalCode', (value, [type = 1]) => {
  switch (Number(type)) {
    case 1:
      return checkNationalCode(value)
    case 2:
      return checkLegalNationalCode(value)
    case 3:
      return checkNationalCode(value) || checkLegalNationalCode(value)
  }
})
extend('mobile', checkMobile)
extend('iban', checkIban)
extend('noZero', noZero)

/*
 * Integrate with localization
 ****************************/
export default function ({ app }) {
  configure({
    defaultMessage: (_, values) => {
      return app.i18n.t(`validations.${values._rule_}`, values)
    },
  })
}
