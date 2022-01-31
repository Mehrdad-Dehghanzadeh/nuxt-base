<template>
  <section class="v-stepper">
    <div v-if="nav" class="v-stepper-nav">
      <ul class="v-stepper-nav__wrapper">
        <li v-for="item in navItems" :key="item" class="v-stepper-nav__item">
          <span class="display-inline-block">
            <span class="v-stepper-nav__bullet"></span>
            <p class="v-stepper-nav__title">{{ item }}</p>
          </span>
        </li>
      </ul>
    </div>

    <div :class="['v-stepper__wrapper', { 'direction-ltr': ltr }]">
      <div class="v-stepper__slider" :style="{ width: sliderWidth }">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "VStepper",

  props: {
    value: {
      type: Number,
      default: 1,
    },
    nav: {
      type: Boolean,
      default: false,
    },
    ltr: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      steps: [],
      navItems: [],
    };
  },

  computed: {
    localValue: {
      get() {
        return this.value;
      },

      set(newVal) {
        this.$nextTick(() => {
          this.$emit("input", newVal);
        });
      },
    },

    sliderWidth() {
      const sliderCount = this.steps.length;
      return `${sliderCount > 1 ? sliderCount * 100 : 100}%`;
    },
  },

  methods: {
    next() {
      this.localValue++;
    },

    pervious() {
      this.localValue--;
    },

    go(step) {
      this.localValue = step;
    },

    setWidthSteps() {
      const stepCount = this.steps.length;
      if (stepCount > 1) {
        this.steps.forEach((element) => {
          element.width = 100 / stepCount;
        });
      }
    },

    setNavItems() {
      this.steps.forEach((el) => {
        this.navItems.push(el.title);
      });
    },
  },

  beforeCreate() {
    this.$nuxt.$on("stepper:next", this.next);
    this.$nuxt.$on("stepper:pervious", this.pervious);
    this.$nuxt.$on("stepper:go", this.go);
  },

  created() {
    this.steps = this.$children;
  },

  mounted() {
    this.setWidthSteps();
    this.setNavItems();
  },
};
</script>

<style lang="scss" src="./VStepper.scss" />
