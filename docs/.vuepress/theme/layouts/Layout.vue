<style>
  @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
</style>

<template>
  <div id="v-app">

    <nav class="v-app__nav">

      <div class="v-app__nav__container">

        <div class="v-app__nav__left"><a class="l-site-home-link" href="/">{{this.$site.title}}</a></div>

        <div class="v-app__nav__center">

          <div class="l-site-nav">

            <div class="l-site-nav__title">{{this.$page.title}}</div>
            <ul class="l-site-nav__list">
              <template v-for="page of $site.pages">
                <li v-if="page.title !== 'projects' && page.title !== $page.title">
                  <a :href="page.path">{{page.title}}</a>
                </li>
              </template>
            </ul>

          </div>

        </div>

        <div class="v-app__nav__right">mastermediadesign.ch</div>

      </div>

    </nav>

    <main>

      <header ref="articleHeader"
              class="v-app__article-header">
      </header>
      <h1
              class="v-app__article-title"
              v-html="this.articleTitle"></h1>

      <section>

        <div class="l-llist-of-student" v-if="$page.frontmatter.students">
          <div>Gabriel Abergel</div>
          <div>Leyla Baghirli</div>
          <div>Aurélie Belle</div>
          <div>Amsatou Diop</div>
          <div>Laïs Kunzendorff</div>
          <div>Johan Pardo</div>
        </div>

        <Content
                ref="articlesContent"
                class="v-app__article-content"
        />
      </section>
    </main>

    <transition name="fade">
      <GalleryImage class="to-animate" v-if="storeData.imageGallery" :prop="storeData.imageGallery"></GalleryImage>
    </transition>

    <footer>
      <p>footer</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {isVue} from "../util"
import {store} from "../enhanceApp"

@Component({
  mounted(this: Layout) {
    this.$nextTick(() => {
      this.updateHeaderVariables()
      this.setImageLayout()
      console.log("next mounted")
    })

    window.addEventListener("scroll", this.scrollEvent)
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

  storeData = store.state

  scrollEvent = () => {
    console.log("scroll")
    if (this.storeData.imageGallery !== null) store.clearImageGallery()
  }

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

  setImageLayout() {
    const articleContainer = this.$refs["articlesContent"] as Vue

    const pElementNodeList = articleContainer.$el.querySelectorAll('p')

    pElementNodeList.forEach( pElement => {

      const imageInPElementNodeList = pElement.querySelectorAll('p > img')

      if(imageInPElementNodeList.length > 1) {

        const imagesContainer = document.createElement("div")
        imagesContainer.className = "ts-img-container"

        const imageContainerLeft  = document.createElement("div")
        imageContainerLeft.className = "ts-img-container__left"

        const imageContainerCenter  = document.createElement("div")
        imageContainerCenter.className = "ts-img-container__center"

        const imageContainerRight = document.createElement("div")
        imageContainerRight.className = "ts-img-container__right"

        imagesContainer.appendChild( imageContainerLeft )
        imagesContainer.appendChild( imageContainerCenter )
        imagesContainer.appendChild( imageContainerRight )

        imageInPElementNodeList.forEach( ( imageInPElement, index ) => {

          const imageBox = document.createElement("div")
          imageBox.className = "ts-img-container__img-container"

          imageBox.appendChild(imageInPElement)
          const imageAlt = imageInPElement.getAttribute("alt") || ""
          imageBox.setAttribute("data-alt", imageAlt )

          imageBox.addEventListener("click", () => {

            console.log(store)

            store.setImageGallery({
              alt: imageAlt,
              src: (imageInPElement as HTMLImageElement).src
            })
          })

          if      ( index % 3 === 0 ) imageContainerLeft.appendChild( imageBox )
          else if ( index % 3 === 1 ) imageContainerCenter.appendChild( imageBox )
          else imageContainerRight.appendChild( imageBox )

        })

        articleContainer.$el.insertBefore(imagesContainer, pElement.nextElementSibling)

        if(pElement.childElementCount === 0) pElement.style.display = "none"
      }

    })

  }
}
</script>

<style lang="scss">
  @import "../styles/params";

  .fade-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .fade-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 250ms ease-out, transform 250ms ease-out;
  }
</style>
