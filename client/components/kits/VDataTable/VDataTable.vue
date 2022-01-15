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
        'v-data-table--bordered': bordered
      }
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
                'v-data-table__col--actions': column.value === 'actions'
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
              'v-data-table__body--stripped': stripped
            }
          ]"
        >
          <slot v-if="localData.length" :data="localData" name="rows">
            <tr
              v-for="(item, index) in localData"
              :key="index"
              v-long-click="{
                active: hasDblclick,
                handler: () => $emit('dblclick:row', item, index)
              }"
            >
              <td v-for="(col, i) in headers" :key="i">
                <template v-if="col.value === 'actions'"> </template>

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
import VPaging from '@kits/VPaging/VPaging'

export default {
  name: 'VDataTable',

  components: { VPaging },

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    resource: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: 'read'
    },
    paging: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 25
    },
    pageSizes: {
      type: Array,
      default: () => [25, 50, 100, 200]
    },
    standby: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    },
    stripped: {
      type: Boolean,
      default: true
    },
    headless: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      localData: [],

      total: 0,

      loading: false,

      options: {
        page: this.page,
        pageSize: this.pageSize
      }
    }
  },

  computed: {
    filters() {
      return { ...this.options, ...this.query }
    },

    hasDblclick() {
      return typeof this.$listeners['dblclick:row'] === 'function'
    }
  },

  watch: {
    'options.page'() {
      this.read()
    },
    'options.pageSize'() {
      this.reset()
    }
  },

  methods: {
    read() {
      if (this.resource) {
        this.loading = true
        this.$api[this.resource]
          [this.action](this.filters)
          .then(({ data }) => {
            this.localData = data.data
            this.total = data.total
            this.loading = false
          })
          .catch((err) => {
            this.$snack.error(err)
            this.loading = false
          })
      } else {
        const base = (this.options.page - 1) * this.options.pageSize
        this.localData = this.data.slice(base, base + this.options.pageSize)
      }
    },

    reset() {
      this.options.page === 1 ? this.read() : (this.options.page = 1)
    }
  },

  created() {
    this.$nuxt.$on('readTable', () => {
      this.read()
    })
  },

  mounted() {
    this.read()
  }
}
</script>

<style src="./VDataTable.scss" lang="scss" />
