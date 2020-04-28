<template>
    <nav class="v-page-nav"
         @mouseleave="isOpen = false"
         @mouseenter="isOpen = true">

        <div class="v-page-nav__top">

            <div class="v-page-nav__top__left">
                <a class="l-ui-link-no-style" href="/">{{this.$site.title}}</a>
            </div>

            <div class="v-page-nav__top__center">
                <div class="v-page-nav__top__title">{{this.siteNavTitle}}</div>
            </div>

            <div class="v-page-nav__top__right">
                <a href="https://mastermediadesign.ch" target="_blank" class="l-ui-link-no-style">mastermediadesign.ch</a>
            </div>

        </div>

        <div class="v-page-nav__bottom" v-if="isOpen">

            <div class="v-page-nav__bottom__center">
                <ul class="v-page-nav__bottom__pages l-ui-list l-ui-list--small">
                    <template v-for="page of $site.pages">
                        <li v-if="page.path !== '/' && page.title !== $page.title">
                            <a :href="page.path"
                               class="l-ui-link-no-style">{{page.title}}</a>
                        </li>
                    </template>
                </ul>
            </div>

        </div>

    </nav>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import Layout from "../layouts/Layout.vue"
    import {PageComputed} from "vuepress-types"

    @Component({
      created(this: Layout) {
        this.$nextTick(() => {
          console.log("PageNav: next created")
        })
      },
    })
    export default class PageNav extends Vue {
      private property = {
        isOpen: false
      }

      get isHome() {
        return this.$page.path === '/'
      }

      get siteNavTitle() {
        return this.isHome ? this.$themeConfig.articlesNames : this.$page.relativePath.replace(/\/index.md$/, "")
      }

      get isOpen() {
        return this.isHome ? false : this.property.isOpen
      }
      set isOpen(value: boolean) {
        this.property.isOpen = this.isHome ? false : value
      }

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/font-settings";
    @import "../styles/grid";

    .v-page-nav {
        user-select: none;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100000;
        height: $nav-height;
        border-bottom: solid 1px $site-color;
    }

    // top
    .v-page-nav__top {
        @include column-container;
        /*border-bottom: solid 1px;*/
        background-color: $site-theme-color;
        width: 100%;
        height: 100%;
        overflow: hidden;

        max-width: 1280px;
        box-sizing: border-box;
        margin: auto;
    }

    .v-page-nav__top__left {
        @include grid-coll-number(2, 12);
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;
    }

    .v-page-nav__top__center {
        @include font--2;
        @include grid-coll-number(4, 12);
        padding: 0 $grid-gutter-width / 2;
        margin: 0;
    }

    .v-page-nav__top__right {
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;
    }

    .v-page-nav__top__title {
        text-transform: lowercase;
    }

    // bottom
    .v-page-nav__bottom {
        @include column-container;
        padding-bottom: $grid-gutter-width / 2;
        background-color: $site-theme-color;
        overflow: hidden;
        border-bottom: solid 1px;
    }

    .v-page-nav__bottom__center {
        @include grid-gap-left-coll(2, 12);
        padding: 0 $grid-gutter-width / 2;
    }

    .v-page-nav__bottom__pages {
        text-transform: lowercase;
    }

</style>
