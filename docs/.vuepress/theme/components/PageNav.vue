<template>
    <nav class="v-page-nav"
         :class="{'is-open': isOpen}"
         @mouseleave="isOpen = false"
         @mouseenter="isOpen = true">

        <div class="v-page-nav__top">

            <div class="v-page-nav__top__left">
                <RouterLink class="l-ui-link-no-style" to="/" >{{this.$site.title}}</RouterLink>
            </div>

            <div class="v-page-nav__top__center">
                <div class="v-page-nav__top__title">{{this.siteNavTitle}}</div>
            </div>

            <div class="v-page-nav__top__right">
                <a href="https://www.hesge.ch/head/formations-recherche/master-en-media-design" target="_blank" class="l-ui-link-no-style">mastermediadesign.ch</a>
            </div>

        </div>

        <div class="v-page-nav__bottom" v-if="isOpen">

            <div class="v-page-nav__bottom__center">
                <PagesList/>
            </div>

        </div>

    </nav>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import Layout from "../layouts/Layout.vue"
    import {PageComputed} from "vuepress-types"
    import PagesList from "../global-components/PagesList.vue"

    @Component({
      components: {PagesList},
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
        height: $nav-height + 1px;
        border-bottom: solid 1px $site-color;
        background: $site-theme-color;

        &.is-open {
            height: auto;
        }
    }

    // top
    .v-page-nav__top {
        @include column-container;
        /*border-bottom: solid 1px;*/
        background-color: $site-theme-color;
        width: 100%;
        height: $nav-height;
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

        max-width: 1280px;
        box-sizing: border-box;
        margin: auto;
    }

    .v-page-nav__bottom__center {
        @include grid-gap-left-coll(2, 12);
        padding: 0 $grid-gutter-width / 2;

        .v-pages-list {
            margin: 0;
        }
    }
</style>
