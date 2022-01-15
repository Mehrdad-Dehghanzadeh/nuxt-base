<template>
  <div class="v-paging">
    <div class="v-paging__paging">
      <a
        href="#"
        :class="[
          'v-paging__prev',
          { 'v-paging__action--disable': value === 1 }
        ]"
        @click.prevent="prev"
      >
        <i class="v-paging__icon icon-chevron-right"></i>
      </a>

      <ul class="v-paging__pages">
        <li v-if="startPage > 0" class="v-paging__page-wrapper">
          <a
            href="#"
            class="v-paging__page-more"
            @click.prevent="updateValue(startPage)"
          >
            <i class="v-paging__icon icon-more-horizontal" />
          </a>
        </li>

        <li
          v-for="item in endPage - startPage"
          :key="item"
          class="v-paging__page-wrapper"
        >
          <a
            href="#"
            :class="[
              'v-paging__page',
              { 'v-paging__action--active': item + startPage === localValue }
            ]"
            @click.prevent="updateValue(item + startPage)"
          >
            {{ item + startPage }}
          </a>
        </li>

        <li v-if="endPage < pages" class="v-paging__page-wrapper">
          <a
            href="#"
            class="v-paging__page-more"
            data-index="5"
            @click.prevent="updateValue(endPage + 1)"
          >
            <i class="v-paging__icon icon-more-horizontal" />
          </a>
        </li>
      </ul>

      <a
        href="#"
        :class="[
          'v-paging__next',
          { 'v-paging__action--disable': value === pages }
        ]"
        @click.prevent="next"
      >
        <i class="v-paging__icon icon-chevron-left" />
      </a>
    </div>

    <div class="v-paging__info">
      <span class="v-paging__actions">
        <a href="#" class="v-paging__refresh" @click.prevent="refresh">
          <i class="v-paging__icon icon-rotate-cw" />
        </a>

        <div class="v-paging__size-wrapper">
          <a
            href="#"
            :class="['v-paging__size', { 'v-paging__size--active': sizeMenu }]"
            @click.prevent="toggleSizeMenu"
          >
            <span class="v-paging__size-text">{{ pageSize }}</span>
            <i class="v-paging__size-chevron icon-chevron-up" />
          </a>

          <ul class="v-paging__size-menu">
            <li v-for="size in localPageSizes" :key="size">
              <a
                href="#"
                :class="[
                  'v-paging__size-item',
                  { 'v-paging__size-item--active': size === pageSize }
                ]"
                @click.prevent="updatePageSize(size)"
              >
                {{ size }}
              </a>
            </li>
          </ul>
        </div>
      </span>

      <span>
        نمایش <span class="v-paging__current">{{ min }} - {{ max }}</span> از
        <span class="v-paging__total">{{ total }}</span>
      </span>
    </div>
  </div>
</template>

<script>
const DOTS_COUNT = 5

export default {
  name: 'VPaging',

  props: {
    value: {
      type: [String, Number],
      default: 1
    },
    pageSize: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      localValue: null,
      localPageSizes: this.pageSizes.reverse(),

      sizeMenu: false
    }
  },

  computed: {
    pages() {
      if (this.total > 0) {
        return Math.ceil(this.total / this.pageSize)
      }
      return 1
    },

    min() {
      return Math.min((this.localValue - 1) * this.pageSize + 1, this.total)
    },

    max() {
      return Math.min(this.localValue * this.pageSize, this.total)
    },

    pageCount() {
      return Math.min(this.pages, DOTS_COUNT)
    },

    startPage() {
      return parseInt((this.localValue - 1) / DOTS_COUNT) * DOTS_COUNT
    },

    endPage() {
      return Math.min(this.startPage + DOTS_COUNT, this.pages)
    }
  },

  watch: {
    value: {
      handler(newValue) {
        this.localValue = parseInt(newValue)
      },
      immediate: true
    }
  },

  methods: {
    updateValue(item) {
      this.$emit('input', item)
    },

    next() {
      if (this.localValue === this.pages) {
        return
      }

      this.updateValue(this.localValue + 1)
    },

    prev() {
      if (this.localValue === 1) {
        return
      }

      this.updateValue(this.localValue - 1)
    },

    updatePageSize(value) {
      this.sizeMenu = false
      this.$emit('update:pageSize', value)
    },

    refresh() {
      this.$emit('refresh')
    },

    toggleSizeMenu() {
      this.sizeMenu = !this.sizeMenu
    }
  }
}
</script>

<style src="./VPaging.scss" lang="scss" />
