<template>
    <nav class="v-mmd-nav v-app__nav">
        <div class="v-app__nav__container">

            <div class="v-app__nav__left"><a class="l-link--no-style" href="/">{{this.$site.title}}</a></div>

            <div class="v-app__nav__center">

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

            <div class="v-app__nav__right">
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
          console.log("MmdNav: next created")
        })
      },
    })
    export default class MmdNav extends Vue {
      get siteNavTitle() {
        return this.$page.path === '/' ? "projects /" : this.$page.relativePath.replace(/\/index.md$/, " /")
      }
    }
</script>

<style lang="scss" scoped>
    .v-mmd-nav {

    }
</style>
