<template>
    <div class="v-list-of-students" >
        <div>Gabriel Abergel</div>
        <div>Leyla Baghirli</div>
        <div>Aurélie Belle</div>
        <div>Amsatou Diop</div>
        <div>Laïs Kunzendorff</div>
        <div>Johan Pardo</div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
      mounted(this: ListOfStudents) {
        const repperElement = document.querySelector('.ts-fixed-repper')

        if (repperElement instanceof HTMLElement) {

          this.scrollEvent = () => {

            const elementIsFixed = this.$el.classList.contains(this.CLASS_NAME_WHEN_FIX)

            if (repperElement.getBoundingClientRect().top < this.HEIGHT_OF_HEADER && !elementIsFixed) {

              this.$el.classList.add(this.CLASS_NAME_WHEN_FIX)

            } else if (repperElement.getBoundingClientRect().top >= this.HEIGHT_OF_HEADER && elementIsFixed) {

              this.$el.classList.remove(this.CLASS_NAME_WHEN_FIX)

            }

          }

          window.addEventListener("scroll", this.scrollEvent)

        } else {
          console.error('no fixed repper')
        }
      }
    })
    export default class ListOfStudents extends Vue {

      private readonly HEIGHT_OF_HEADER = 60
      private readonly CLASS_NAME_WHEN_FIX = "fixed"

      scrollEvent?: (ev: Event) => any

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-list-of-students {
        position: absolute;
        left: 0;
        top: 0;
        font-family: $font-serif;
        font-size: 15px;
        line-height: 20px;
        font-weight: 800;

        &.fixed {
            position: fixed;
            width: calc(100% / 12 * 2);
            top: 60px;
            box-sizing: border-box;
            left: unset;
        }
    }
</style>
