<template>
    <section class="v-grid-tool">
        <div v-for="lineNumber in numberOfLines"
             :style="{
                top: (top * 1) + (padding_px * lineNumber) +'px',
                background: color,
             }"
             class="v-grid-tool__line"></div>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
      mounted(this: GridTool) {
        this.buildGrid()

        window.addEventListener('resize', () => {
          this.buildGrid()
        })
      }
    })
    export default class GridTool extends Vue {

      @Prop({default: 10})
      padding_px!: number


      @Prop({default: "red"})
      color!: string

      @Prop({default: 0})
      top!: number

      numberOfLines = 0

      buildGrid() {

        const gridContainerRect = this.$el.getBoundingClientRect()
        this.numberOfLines = Math.floor( gridContainerRect.height / this.padding_px )
      }
    }
</script>

<style lang="scss" scoped>
    .v-grid-tool {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .v-grid-tool__line {
        position: absolute;
        width: 100%;
        height: 1px;
        opacity: .25;
    }
</style>
