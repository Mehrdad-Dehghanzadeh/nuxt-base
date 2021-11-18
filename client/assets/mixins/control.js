export default {
  props: {
    id: {
      type: String,
      default: null
    },

    name: {
      type: String,
      default: null
    },

    rules: {
      type: [String, Object],
      default: null
    }
  },

  computed: {
    localId_() {
      if (typeof this._uid !== 'undefined') {
        return 'app__' + this._uid
      }
    },

    safeId() {
      const id = this.id || this.localId_ || null
      return id || null
    },

    safeName() {
      return this.name || this.safeId
    },

    isRequired() {
      return (
        this.rules !== null &&
        (typeof this.rules === 'object'
          ? this.rules.required
          : this.rules.includes('required'))
      )
    }
  }
}
