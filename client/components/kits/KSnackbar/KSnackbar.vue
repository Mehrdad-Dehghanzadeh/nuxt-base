<template>
  <div class="k-snackbar">
    <transition name="slide-up">
      <div
        :class="['k-snackbar__item', snack.type ? `bg-${snack.type}` : null]"
        v-if="active"
        @click.prevent="close"
      >
        <span :class="['k-snackbar__icon', icon]"></span>
        <span class="k-snackbar__text">{{ snack.text }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "KSnackbar",

  data() {
    return {
      snack: null,

      iconMapping: {
        success: "icon-check-circle",
        info: "icon-info",
        alert: "icon-alert-triangle",
        error: "icon-x-octagon",
      },
    };
  },

  computed: {
    active() {
      return this.snack instanceof Object;
    },

    icon() {
      return this.active && this.iconMapping[this.snack.type]
        ? this.iconMapping[this.snack.type]
        : "notification";
    },
  },

  watch: {
    active(newVal) {
      if (newVal) {
        clearTimeout(this.closeTimeout);

        this.closeTimeout = setTimeout(() => {
          this.snack = null;
        }, this.snack.time);
      }
    },
  },

  methods: {
    appear(payload) {
      this.snack = null;
      clearTimeout(this.delayTimeout);

      this.delayTimeout = setTimeout(() => {
        this.snack = payload;
      }, 300);
    },

    close() {
      this.snack = null;
      clearTimeout(this.closeTimeout);
    },
  },
};
</script>

<style lang="scss" src="./KSnackbar.scss" />
