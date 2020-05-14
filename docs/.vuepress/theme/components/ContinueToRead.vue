<template>
    <section class="v-continue-to-read">

        <div class="v-continue-to-read__container">

            <div class="v-continue-to-read__left">
                <h3>Follow us</h3>
                <div class="l-ui-items">
                    <a href="https://twitter.com/HeadMediaDesign" class="l-ui-link-no-style">Twitter</a>
                    <a href="https://www.instagram.com/headmediadesign/" class="l-ui-link-no-style">Instagram</a>
                    <a href="https://vimeo.com/headmediadesign" class="l-ui-link-no-style">Vimeo</a>
                    <a href="https://www.hesge.ch/head/en/programs-research/master-arts-media-design" class="l-ui-link-no-style">Head&nbsp;–&nbsp;Genève</a>
                </div>
            </div>

            <RouterLink class="v-continue-to-read__right l-ui-link-no-style" :to="nextArticle.path">
                <h3>Next project</h3>
                <div>
                    {{ nextArticle.title }} ->
                </div>
            </RouterLink>

        </div>

    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {PageComputed} from "vuepress-types"

    @Component
    export default class ContinueToRead extends Vue {

      get nextArticle(): PageComputed {

        const articles = this.$site.pages.filter(value => {
          return value.relativePath.split("/").length === 2
        })

        const currentIndex = articles.findIndex((value) => {
          return value.path === this.$page.path
        })

        const nextIndex = (currentIndex+1 < 0 || currentIndex+1 > articles.length - 1) ? 0 : currentIndex + 1

        return articles[nextIndex]
      }

    }
</script>

<style lang="scss" scoped>
    @import "../styles/grid";
    @import "../styles/params";

    .v-continue-to-read {
        border-top: solid 1px $site-color;
        position: relative;
        background: $site-theme-color;
    }

    .v-continue-to-read__container {
        @include column-container;
        max-width: 1280px;
        margin: auto;
    }

    .v-continue-to-read__left {
        @include grid-coll-number(1, 2);
        padding-top: $line-height / 4;
        padding-bottom: $line-height / 2;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;

        border-right: solid 1px $site-color;

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }

        > * {margin: 0}
    }

    .v-continue-to-read__right {
        @include grid-coll-number(1, 2);
        padding-top: $line-height / 4;
        padding-bottom: $line-height / 2;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }

        > * {margin: 0}
    }
</style>
