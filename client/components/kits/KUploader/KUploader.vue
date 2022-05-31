<template>
  <validation-provider
    ref="provider"
    v-slot="{ errors }"
    :rules="localRules"
    slim
  >
    <div
      :class="[
        'k-uploader',
        {
          'k-uploader--has-content': localValue
        },

        'control',
        {
          'control--error': errors.length,
          'control--solo': solo,
          'control--disabled': disabled,
          'control--readonly': readonly
        }
      ]"
    >
      <label
        v-if="!solo && label"
        :for="safeId"
        :class="['control__label', { 'control__label--marked': isRequired }]"
        @click.prevent="choose"
        @mousedown.prevent
        v-text="label"
      />

      <div
        :class="['k-uploader__field', 'control__field', inputClass]"
        @click.self="choose"
      >
        <input :value="localValue" type="hidden" />

        <div class="control__append">
          <slot name="action" />

          <a
            v-if="!disabled && !readonly"
            v-show="localValue"
            href="javascript:;"
            class="k-uploader__delete control__action control__action--large"
            @click="clearHandler"
          >
            <i class="icon icon-x-square" />
          </a>

          <a
            v-if="!localValue"
            href="javascript:;"
            class="k-uploader__icon control__action control__action--large"
            @click="choose"
          >
            <i class="icon icon-upload" />
          </a>

          <span
            v-if="suffix"
            class="control__suffix"
            @click="choose"
            v-text="suffix"
          />
        </div>

        <div class="control__wrapper" @click.self="choose">
          <input
            :id="safeId"
            ref="input"
            :name="safeName"
            :accept="accept"
            type="file"
            class="hidden"
            capture="capture"
            :disabled="disabled"
            @change="validate"
          />

          <template v-if="localValue">
            <span class="k-uploader__thumbnail">
              <img v-if="isImage" :src="localValue" class="k-uploader__img" />
              <span v-else>{{ ext }}</span>
            </span>

            <span v-if="uploading" class="k-uploader__percent">
              %{{ percent }}
            </span>

            <span v-else-if="value" class="k-uploader__status">آپلود شده</span>

            <span v-else class="k-uploader__title">{{ fileName }}</span>
          </template>

          <template v-else>
            <span class="k-uploader__placeholder" @click="choose">
              {{ localPlaceholder }}
            </span>
          </template>
        </div>

        <k-progress
          v-if="uploading"
          class="control__loading"
          :value="percent"
        />
      </div>

      <em v-show="!solo" class="control__error" :value="errors[0]" />
    </div>
  </validation-provider>
</template>

<script>
import { fullPath } from '@helpers/filters'
import { fileType } from '@data/file'

import controlMixin from '@mixins/control.js'

export default {
  name: 'VUploader',

  mixins: [controlMixin],

  props: {
    value: {
      type: [String, Object],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'انتخاب کنید ...'
    },
    resource: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      default: 'create'
    },
    inputClass: {
      type: String,
      default: null
    },
    size: {
      type: [Number, String],
      default: 2048
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    types: {
      type: [String, Array],
      default: () => ['image']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: null
    },
    solo: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localValue: null,

      percent: 0,
      uploading: false
    }
  },

  computed: {
    extensions() {
      let list = []
      const tyepes =
        typeof this.types === 'string' ? this.types.split(',') : this.types
      tyepes.forEach((i) => {
        list = list.concat(fileType[i].extensions)
      })
      return list
    },

    localRules() {
      const additional = `size:${this.size}|ext:${this.extensions.join(',')}`
      return this.localValue
        ? ''
        : this.isRequired
        ? 'required|' + additional
        : additional
    },

    localPlaceholder() {
      return this.solo ? this.label || this.placeholder : this.placeholder
    },

    accept() {
      return this.extensions.map((i) => '.'.concat(i)).join(',')
    },

    ext() {
      const path = this.value
        ? this.value
        : this.localValue
        ? this.file.name
        : ''
      return path.substr(path.lastIndexOf('.') + 1)
    },

    fileName() {
      const path = this.value
        ? this.value
        : this.localValue
        ? this.file.name
        : ''
      return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    },

    isImage() {
      return this.localValue
        ? fileType.image.extensions.includes(this.ext)
        : false
    }
  },

  watch: {
    value: {
      handler(newValue) {
        this.localValue = newValue ? fullPath(newValue) : newValue
      },
      immediate: true
    }
  },

  methods: {
    updateValue(newValue, updateParent) {
      if (updateParent) {
        if (!newValue) this.localValue = newValue

        this.$nextTick(() => {
          this.$emit('input', newValue)
        })
      } else {
        this.localValue = newValue
      }
    },

    clearHandler() {
      if (this.disabled || this.readonly) {
        return
      }

      if (this.localValue) {
        if (typeof this.cancel === 'function') {
          this.manualException = true

          this.cancel()
        }

        this.clear()
      }
    },

    clear() {
      this.cancel = null
      this.file = null
      this.percent = 0

      this.updateValue(null, true)

      this.$refs.input.value = null
    },

    choose(e) {
      if (this.readonly) {
        return
      }

      if (!this.localValue) {
        this.$refs.input.click()
      }
    },

    validate(e) {
      const file = e.target.files[0]

      this.$refs.provider.validate(file).then((result) => {
        if (result.valid) {
          const fr = new FileReader()
          fr.readAsDataURL(file)

          fr.addEventListener('load', () => {
            this.updateValue(URL.createObjectURL(file))
            this.file = file

            if (this.autoUpload) {
              this.upload()
            }
          })
        } else {
          this.$refs.provider.setErrors(result.errors)
        }
      })
    },

    getFile() {
      return this.file
    },

    upload() {
      return new Promise((resolve, reject) => {
        if (this.value || !this.localValue) {
          resolve()
          return
        }

        if (this.uploading) {
          reject(
            new Error(
              `فایل '${
                this.label || this.placeholder
              }' در حال بارگذاریست، لطفا بعد از اتمام بارگذاری مجددا تلاش نمایید.`
            )
          )
          return
        }

        this.uploading = true

        // if wasnt uploaded
        const self = this
        const CancelToken = this.$axios.CancelToken

        const formdata = new FormData()
        formdata.append('file', this.file)

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          cancelToken: new CancelToken(function executor(c) {
            self.cancel = c
          }),
          onUploadProgress: (progressEvent) => {
            this.percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
          }
        }

        this.$api[this.resource]
          [this.action](formdata, config)
          .then((res) => {
            this.cancel = null

            this.updateValue(res.data, true)

            this.uploading = false

            resolve(res)
          })
          .catch((e) => {
            this.uploading = false

            if (this.manualException) {
              this.manualException = false

              resolve(e)
            } else {
              if (this.autoUpload) {
                this.$snack.response(e)
              }

              reject(e)
            }
          })
      })
    }
  }
}
</script>

<style src="./KUploader.scss" lang="scss" />
