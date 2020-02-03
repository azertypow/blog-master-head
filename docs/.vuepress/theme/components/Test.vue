<template>
  <div>
    <h1>{{ message }}</h1>

    <div v-if="this.hasValidVimeoURL()">
      {{this.vimeoUrl}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  message = 'Test Component'

  @Prop() vimeoUrl?: String

  hasValidVimeoURL() {
    return this. vimeoUrl !== void(0)
  }
}
</script>

<style lang="scss" scoped>
  div {
    color: red;
  }
</style>
