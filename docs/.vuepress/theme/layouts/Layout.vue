<template>
  <div id="v-app">
    <nav class="v-app__nav">
        <div>{{this.$site.title}}</div>
        <div>mastermediadesign.ch</div>
    </nav>

    <main>

      <header ref="articleHeader"
              class="v-app__article-header">
        <h1
                class="v-app__article-title"
                v-html="this.articleTitle"></h1>
      </header>

      <section>
        <Content
                ref="articlesContent"
                class="v-app__article-content"
        />
      </section>
    </main>

    <footer>
      <p>footer</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Test from "../components/Test.vue"
import {isVue} from "../util"

@Component({
  mounted(this: Layout) {
    this.$nextTick(() => {
      this.updateHeaderVariables()
    })
  },

  watch:{
    $route (this: Layout, to, from){
      this.$nextTick(() => {
        this.updateHeaderVariables()
      })
    }
  }
})
export default class Layout extends Vue {
  allImagesInContent?: NodeListOf<HTMLImageElement>

  articleTitle: string = this.$siteTitle || ""
  articleTitleRefElementInContent?: HTMLElement

  setArticleTitleFromElement(Element: Element) {

    this.articleTitle = this.$siteTitle || ""
    this.articleTitleRefElementInContent = undefined

    if(Element.firstChild instanceof HTMLHeadingElement) {
      this.articleTitleRefElementInContent = Element.firstChild
      this.articleTitle = Element.firstChild.innerHTML
    }

    if(this.articleTitleRefElementInContent !== void(0)) this.articleTitleRefElementInContent.style.display = "none"
  }

  updateHeaderVariables() {

    console.log("update")

    // get all image in article
    this.allImagesInContent = this.$el.querySelectorAll("img")

    // set article title to the html > main > header
    const contentInstance = this.$refs.articlesContent

    if( contentInstance !== void(0) && isVue(contentInstance) ) {

      this.setArticleTitleFromElement(contentInstance.$el)

    }
  }
}
</script>

<style lang="scss">
  @import "../styles/params";

  $nav-height: 6rem;

  .v-app__nav {
    @include column-container;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $nav-height;
    position: fixed;
    background-color: $site-color;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100000;
  }

  main {
    padding-top: $nav-height;
  }

  .v-app__article-header {
    overflow: hidden;
    width: 100%;
    background: #e2e2e2;
    height: calc(100vh - #{$nav-height} - 8rem);
  }

  .v-app__article-title {
    font-family: "Suisse EDU Works", serif;
    font-size: 5em;
    line-height: 8rem;
  }
</style>
