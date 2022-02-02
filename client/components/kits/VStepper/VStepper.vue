<template>
  <section class="v-stepper">
    <!-- stepper nav -->
    <div v-if="nav" class="v-stepper-nav">
      <div class="v-stepper-nav__wrapper">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          :style="{ flex: `0 0 ${navItemWidth}` }"
          class="v-stepper-nav__item"
        >
          <span class="v-stepper-nav__label" @click.prevent="navigate(index + 1)">
            <span
              :class="[
                'v-stepper-nav__bullet',
                {
                  'v-stepper-nav__bullet--active': localValue == index + 1,
                  'v-stepper-nav__bullet--success': localValue > index + 1
                }
              ]"
            >
              <i
                v-if="localValue > index"
                :class="[
                  'icon',
                  {
                    'icon-check': localValue > index + 1,
                    'icon-circle': localValue == index + 1
                  }
                ]"
              ></i>
              <span v-else> {{ index + 1 }} </span>
            </span>

            <slot
              :name="`title-${index + 1}`"
              :title="{ title: item, step: index + 1 }"
            >
              <p class="v-stepper-nav__title">{{ item }}</p>
            </slot>
          </span>
        </div>
      </div>
    </div>
    <!-- stepper nav -->

    <!-- stepper slider -->
    <div :class="['v-stepper__wrapper', { 'direction-ltr': ltr }]">
      <div class="v-stepper__slider">
        <slot />
      </div>
    </div>
    <!-- stepper slider -->
  </section>
</template>

<script>
export default {
  name: 'VStepper',

  props: {
    value: {
      type: Number,
      default: 1
    },
    nav: {
      type: Boolean,
      default: false
    },
    navigating: {
      type: Boolean,
      default: false
    },
    ltr: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      steps: [],
      navItems: [],
      activeStep: null
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },

      set(newVal) {
        this.setActiveStep(newVal)
        this.$nextTick(() => {
          this.$emit('input', newVal)
        })
      }
    },

    sliderWidth() {
      const sliderCount = this.steps.length
      return `${sliderCount > 1 ? sliderCount * 100 : 100}%`
    },

    navItemWidth() {
      const navCount = this.navItems.length
      return `${navCount > 1 ? 100 / navCount : 100}%`
    }
  },

  methods: {
    next() {
      this.localValue++
    },

    pervious() {
      this.localValue--
    },

    go(step) {
      this.localValue = step
    },

    setNavItems() {
      this.steps.forEach((el) => {
        this.navItems.push(el.title)
      })
    },

    setActiveStep(val) {
      if (!!this.activeStep) {
        this.activeStep.active = false
      }
      this.activeStep = this.steps[val - 1]
      this.activeStep.active = true
    },

    navigate(step) {
      if (this.navigating) {
        this.go(step)
      }
    }
  },

  beforeCreate() {
    this.$nuxt.$on('stepper:next', this.next)
    this.$nuxt.$on('stepper:pervious', this.pervious)
    this.$nuxt.$on('stepper:go', this.go)
  },

  created() {
    this.steps = this.$children
  },

  mounted() {
    this.setActiveStep(this.value)
    this.setNavItems()
  }
}
</script>

<style lang="scss" src="./VStepper.scss" />
