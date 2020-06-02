<template>
  <svg class="svg-icon" aria-hidden="true" :style="style">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    size: {
      type: Number
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    style () {
      return {
        height: `${this.size}em`,
        width: `${this.size}em`
      }
    }
  }
}
</script>
