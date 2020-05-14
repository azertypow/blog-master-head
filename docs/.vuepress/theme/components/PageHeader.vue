<template>
    <header class="v-page-header"
            :style="{backgroundColor: this.backgroundColor}"
            :class="{'has-cover': imageHeader !== null}">

        <img v-if="imageHeader !== null"
             :src="imageHeader"
             :alt="'cover of ' + $page.title + 'article. Head&nbsp;–&nbsp;Genève'">

    </header>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {IPageFrontmatter} from "../../IPageFrontmatter"

    @Component
    export default class PageHeader extends Vue {
      private readonly DEFAULT_BACKGROUND_COLOR = "#000000"

      get imageHeader(): string | null {
        return (this.$page.frontmatter as IPageFrontmatter)?.cover || null
      }

      get backgroundColor(): string {
        const backgroundColor: string = (this.$page.frontmatter as IPageFrontmatter)?.["cover-color"] || this.DEFAULT_BACKGROUND_COLOR

        return this.imageHeader === null ? "transparent" : backgroundColor
      }

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-page-header {
        position: relative;
        width: 100%;
        overflow: hidden;
        box-sizing: content-box;
        padding-top: $nav-height;

        &.has-cover {
            width: 100%;
            height: $header-article-height;
            min-height: 350px;
            max-height: 900px;
        }

        > img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: contain;
        }
    }
</style>
