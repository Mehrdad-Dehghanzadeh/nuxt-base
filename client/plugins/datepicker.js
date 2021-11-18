import Vue from 'vue'
import JalaliDatepicker from 'vue-persian-datetime-picker'

Vue.use(JalaliDatepicker, {
  name: 'JalaliDatepicker',
  props: {
    locale: 'fa',
    editable: false,
    placeholder: 'لطفا انتخاب نمایید...',
    color: '#00897b',
    autoSubmit: true,
    appendTo: 'body'
  }
})
