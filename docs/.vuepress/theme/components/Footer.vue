<template>
    <footer class="v-footer">

        <div class="v-footer__social" v-if="isHome">
          <div class="v-footer__social__content">
            <a target="_blank" href="https://twitter.com/HeadMediaDesign">Twitter</a>
            <a target="_blank" href="https://www.instagram.com/headmediadesign/">Instagram</a>
            <a target="_blank" href="https://vimeo.com/headmediadesign">Vimeo</a>
            <a target="_blank" href="https://www.hesge.ch/head/en/programs-research/master-arts-media-design">HEAD&nbsp;–&nbsp;Genève</a>
          </div>
        </div>

        <div class="v-footer__top-box">
            <div class="v-footer__top">
                <div class="v-footer__top__left"></div>

                <div class="v-footer__top__center">
                    <h6 @click="toggleAbout">about <template v-if="arrowAboutDirectionToTop">↑</template><template v-else>↓</template></h6>
                </div>

                <div class="v-footer__top__right">
                    <h6 @click="toggleAbout" >
                        <span class="l-ui-link-no-style">© 2020 Master Media Design, Head&nbsp;–&nbsp;Genève</span>
                    </h6>
        <!--            <h6><span >Nicolas Baldran et David Héritier</span></h6>-->
                </div>
            </div>
        </div>

        <div class="v-footer__bottom-box">
            <div class="v-footer__bottom" v-if="aboutIsOpen">
                <About></About>
            </div>
        </div>

    </footer>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import About from "./About.vue"
    import {smoothScroll} from "../util/smoothScroll"
    @Component({
      components: {About}
    })
    export default class Footer extends Vue {

      private pProps = {
        aboutIsOpen: false
      }

      get aboutIsOpen(): boolean {
        if( this.isHome ) return true
        return this.pProps.aboutIsOpen
      }

      get arrowAboutDirectionToTop() {
        if( this.isHome ) return false
        return this.pProps.aboutIsOpen
      }

      get isHome() {
        return this.$page.path === '/'
      }

      toggleAbout() {
        if( !this.isHome ) {

          this.pProps.aboutIsOpen = !this.aboutIsOpen

          // setTimeout(() => {
          //     window.scroll({
          //       top: document.body.getBoundingClientRect().height
          //     })
          // }, 150)

        }

        console.log(this.$el)
        console.log("from: ", window.pageYOffset)
        console.log("to: ", window.pageYOffset + this.$el.getBoundingClientRect().top)

        smoothScroll({
          from: window.pageYOffset,
          to:   window.pageYOffset + this.$el.getBoundingClientRect().top,
        })
      }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/grid";
    @import "../styles/font-settings";

    .v-footer {
        overflow: hidden;
        box-sizing: border-box;
        border-top: solid 1px;
        position: relative;
    }

    .v-footer__top-box {
        background: $site-theme-color;
    }

    .v-footer__social {
      @include column-container;
      height: $footer-height;
      background: $site-theme-color;
      border-bottom: solid 1px;
      //color: $site-theme-color;
      //background: $site-color;
    }

    .v-footer__social__content {
      padding-left: $grid-gutter-width / 2;
      padding-right: $grid-gutter-width / 2;
      width: 100%;
      display: flex;
      justify-content: space-between;

      > a {
        color: blue;
        text-decoration: none;
      }
    }

    .v-footer__top {
        @include column-container;
        height: $footer-height;
        user-select: none;
        max-width: 1280px;
        margin: auto;
    }

    .v-footer__top__left {
        @include grid-coll-number(2, 12);
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-footer__top__center {
        @include font--2;
        @include grid-coll-number(4, 12);
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-footer__top__right {
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-footer__bottom-box {
        background-color: $site-color;
    }

    .v-footer__bottom {
        max-width: 1280px;
        margin: auto;
    }

</style>
