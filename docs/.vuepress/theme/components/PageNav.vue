<template>
    <nav class="v-page-nav">
        <div class="v-page-nav__container">

            <div class="v-page-nav__left"><a class="l-link--no-style" href="/">{{this.$site.title}}</a></div>

            <div class="v-page-nav__center">

                <div class="l-site-nav" :class="{'l-site-nav--open': $page.path === '/'}">

                    <div class="l-site-nav__title">{{this.siteNavTitle}}</div>
                    <ul class="l-site-nav__list">
                        <template v-for="page of $site.pages">
                            <li v-if="page.path !== '/' && page.title !== $page.title">
                                <a :href="page.path">{{page.title}}</a>
                            </li>
                        </template>
                    </ul>

                </div>

            </div>

            <div class="v-page-nav__right">
                <a href="https://mastermediadesign.ch" target="_blank" class="l-link--no-style">mastermediadesign.ch</a>
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
      get siteNavTitle() {
        return this.$page.path === '/' ? "projects /" : this.$page.relativePath.replace(/\/index.md$/, " /")
      }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/tool-grid";

    .v-page-nav {
        padding-left: $grid-gutter-width;
        padding-right: $grid-gutter-width;
        box-sizing: border-box;
        position: fixed;
        background-color: $site-color;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100000;
    }

    .v-page-nav__container {
        @include column-container;
        width: 100%;
        height: $nav-height;

        max-width: 1280px;
        box-sizing: border-box;
        margin: auto;
    }

    .v-page-nav__left {
        @include grid-coll-number(2, 12);
    }

    .v-page-nav__center {

    }

    .v-page-nav__right {
        @include grid-coll-number(2, 12);
        margin-left: auto;
        text-align: right;
    }
</style>
