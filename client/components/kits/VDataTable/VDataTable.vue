<template>
  <div
    :class="[
      'v-data-table',
      {
        'v-data-table--rounded': rounded,
        'v-data-table--centered': centered,
        'v-data-table--hoverable': hoverable,
        'v-data-table--scrollable': scrollable,
        'v-data-table--fixed': fixed,
        'v-data-table--dense': dense,
        'v-data-table--bordered': bordered,
      },
    ]"
  >
    <div class="v-data-table__wrapper">
      <table class="v-data-table__grid">
        <thead v-if="!headless" class="v-data-table__head">
          <tr>
            <td
              v-for="(column, index) in headers"
              :key="index"
              :width="column.width"
              :class="{
                'v-data-table__col--actions': column.value === 'actions',
              }"
            >
              {{ column.title }}
            </td>
          </tr>
        </thead>
        <tbody
          :class="[
            'v-data-table__body',
            {
              'v-data-table__body--stripped': stripped,
            },
          ]"
        >
          <slot v-if="localData.length" :data="localData" name="rows">
            <tr
              v-for="(item, index) in localData"
              :key="index"
              v-long-click="{
                active: hasDblclick,
                handler: () => $emit('dblclick:row', item, index),
              }"
            >
              <td v-for="(col, i) in headers" :key="i">
                <template v-if="col.value === 'actions'">
                  <v-menu>
                    <slot
                      :name="`item.${col.value}`"
                      :item="item"
                      :index="index"
                    />
                  </v-menu>
                </template>

                <template v-else>
                  <slot :name="`item.${col.value}`" :item="item" :index="index">
                    {{ item[col.value] || '' }}
                  </slot>
                </template>
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>

    <div v-if="!localData.length" class="v-data-table__status">
      <div v-if="loading" class="v-data-table__overlayer">
        <span class="loading loading--lg"> </span>
      </div>
      <p class="v-data-table__message" v-else>اطلاعاتی یافت نشد</p>
    </div>

    <div v-if="paging" class="v-data-table__footer">
      <v-paging
        v-model="options.page"
        :total="total"
        :page-size.sync="options.pageSize"
        :page-sizes="pageSizes"
        @refresh="read"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VPaging from '@kits/VPaging/VPaging'

export default {
  name: 'VDataTable',

  components: { VPaging },

  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    resource: {
      type: String,
      default: null,
    },
    action: {
      type: String,
      default: 'read',
    },
    paging: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 25,
    },
    pageSizes: {
      type: Array,
      default: () => [25, 50, 100, 200],
    },
    standby: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    hoverable: {
      type: Boolean,
      default: true,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    stripped: {
      type: Boolean,
      default: true,
    },
    headless: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      localData: [],

      total: 0,

      options: {
        page: this.page,
        pageSize: this.pageSize,
      },
    }
  },

  computed: {
    ...mapState({
      mapped(state) {
        return this.resource ? state[this.resource].mapped : true
      },
      loading(state) {
        return this.resource ? state[this.resource].loading : false
      },
    }),

    hasDblclick() {
      return typeof this.$listeners['dblclick:row'] === 'function'
    },
  },

  watch: {
    'options.page'() {
      this.read()
    },
    'options.pageSize'() {
      this.reset()
    },
  },

  mounted() {
    if (!this.resource) {
      this.$watch('data', {
        handler: (newVal) => {
          this.total = newVal.length

          this.reset()
        },
        immediate: true,
      })
    } else {
      this.$store.watch(
        (state) => state[this.resource].data,
        (newVal) => {
          this.localData = newVal
          this.total = this.$store.getters[`${this.resource}/getTotal`]
        }
      )

      if (this.standby) {
        return
      }

      this.read()
    }
  },

  methods: {
    read() {
      if (this.resource) {
        this.$store.dispatch(`${this.resource}/${this.action}`)
      } else {
        const base = (this.options.page - 1) * this.options.pageSize
        this.localData = this.data.slice(base, base + this.options.pageSize)
      }
    },

    setFilters() {
      this.$store.dispatch(`${this.resource}/setFilters`, {
        ...this.options,
        ...this.params,
      })
    },

    reset() {
      this.options.page === 1 ? this.read() : (this.options.page = 1)
    },
  },
}
</script>

<style src="./VDataTable.scss" lang="scss" />
