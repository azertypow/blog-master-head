<template>
  <div id="v-app">

    <PageNav></PageNav>

    <PageHeader ref="pageHeader"></PageHeader>

    <main class="l-app-content"
          ref="appMain" :style="{
      minHeight: mainMinHeight
    }">

      <div class="l-app-content__info"
           v-if="$page.path !== '/'">


        <div class="l-app-content__info__left">

        </div>

        <div class="l-app-content__info__center">
          <h6>last update: {{ $page.frontmatter.date }}</h6>
        </div>

        <div class="l-app-content__info__right">
          <h6>professors: <span
                  v-for="(speaker, index) of this.$page.frontmatter.professors"
          ><template v-if="index > 0">, </template>{{ Object.keys( speaker )[0] }}</span>
          </h6>
        </div>

      </div>

      <h1
              v-if="$page.path !== '/'"
              class="l-app-content__title"
              v-html="this.articleTitle"></h1>

      <section>

        <ListOfStudents></ListOfStudents>

        <Content
                ref="articlesContent"
                class="l-article-content ts-fixed-repper"
        />
      </section>
    </main>

    <transition name="fade">
      <GalleryImage class="to-animate" v-if="storeData.imageGallery" :prop="storeData.imageGallery"></GalleryImage>
    </transition>

    <ContinueToRead
            v-if="$page.path !== '/'"
    />

    <Footer ref="appFooter"></Footer>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {isVue} from "../util"
import {store} from "../enhanceApp"
import ListOfStudents from "../components/ListOfStudents.vue"
import PageHeader from "../components/PageHeader.vue"
import PageNav from "../components/PageNav.vue"
import Footer from "../components/Footer.vue"
import GalleryImage from "../components/GalleryImage.vue"
import ContinueToRead from "../components/ContinueToRead.vue"
import {ImageLazyLoad} from "../util/ImageLazyLoad"

@Component({
  components: {ContinueToRead, Footer, PageNav, PageHeader, ListOfStudents, GalleryImage},
  mounted(this: Layout) {
    this.$nextTick(() => {
      this.setImgLazyLoad()
      this.updateHeaderVariables()
      this.setImageLayout()
      this.setMainMinHeight()
      console.log("next mounted")
    })

    window.addEventListener("scroll", this.scrollEvent)
  },

  watch:{
    $route (this: Layout, to, from){
      this.$nextTick(() => {
        this.setImgLazyLoad()
        this.updateHeaderVariables()
        this.setImageLayout()
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
    if (this.storeData.imageGallery !== null) store.clearImageGallery()
  }

  setArticleTitleFromElement(Element: Element) {

    this.articleTitle = this.$page.title || ""

    if (
      Element.firstElementChild instanceof HTMLHeadingElement &&
      Element.firstElementChild.innerText === this.articleTitle
    ) {
      Element.firstElementChild.remove()
    }

  }

  updateHeaderVariables() {
    // set article title to the html > main > header
    const contentInstance = this.$refs.articlesContent

    if( contentInstance !== void(0) && isVue(contentInstance) ) {

      this.setArticleTitleFromElement(contentInstance.$el)

    }
  }

  setImgLazyLoad() {

    const articleContainer = this.$refs["articlesContent"] as Vue
    const imgInContent = articleContainer.$el.querySelectorAll("img")

    imgInContent.forEach(imageElement => {

      store.addCurrentsImageLazyLoad( new ImageLazyLoad( imageElement, this.$page.path ) )

    })
  }

  setImageLayout() {
    const articleContainer = this.$refs["articlesContent"] as Vue

    const pElementNodeList = articleContainer.$el.querySelectorAll('p')

    pElementNodeList.forEach( pElement => {

      const imageInPElementNodeList = pElement.querySelectorAll('p > img')

      if(imageInPElementNodeList.length > 1) {

        const hasMore2Images = imageInPElementNodeList.length > 2

        const imagesContainer = document.createElement("div")
        imagesContainer.className = "ts-img-container"

        const imageContainerLeft  = document.createElement("div")
        imageContainerLeft.className = "ts-img-container__left"

        const imageContainerCenter  = document.createElement("div")
        imageContainerCenter.className = "ts-img-container__center"

        const imageContainerRight = document.createElement("div")
        imageContainerRight.className = "ts-img-container__right"

        imagesContainer.appendChild( imageContainerLeft )
        if(hasMore2Images) imagesContainer.appendChild( imageContainerCenter )
        imagesContainer.appendChild( imageContainerRight )

        imageInPElementNodeList.forEach( ( imageInPElement, index ) => {

          const imageBox = document.createElement("div")
          imageBox.className = "ts-img-container__img-container"

          imageBox.appendChild(imageInPElement)
          const imageAlt = imageInPElement.getAttribute("alt") || ""
          imageBox.setAttribute("data-alt", imageAlt )

          imageBox.addEventListener("click", () => {

            store.setImageGallery({
              alt: imageAlt,
              src: (imageInPElement as HTMLImageElement).src
            })
          })

          if (hasMore2Images) {

            if (index % 3 === 0) imageContainerLeft.appendChild(imageBox)
            else if (index % 3 === 1) imageContainerCenter.appendChild(imageBox)
            else imageContainerRight.appendChild(imageBox)

          } else {

            if (index % 2 === 0) imageContainerLeft.appendChild(imageBox)
            else imageContainerRight.appendChild(imageBox)

          }

        })

        pElement.appendChild( imagesContainer )
        pElement.classList.add( "ts-has-image-container" )
      }

    })

  }

  get isHome() {
    return this.$page.path === '/'
  }

  mainMinHeight = ""

  get defaultMainMinHeight(): string {
    return `calc( 100vh - ${this.pageHeaderHeight} - ${this.mainMarginBottom} )`
  }

  get mainMarginBottom(): string {
    const appMain = this.$refs.appMain

    if( appMain instanceof HTMLElement ) return window.getComputedStyle( appMain ).marginBottom

    return "0"
  }

  get pageHeaderHeight(): string {
    const pageHeader = this.$refs.pageHeader

    if( "$el" in pageHeader ) return pageHeader.$el.getBoundingClientRect().height + "px"

    return "0"
  }

  setMainMinHeight() {

    if( this.isHome ) {
      const footer = this.$refs.appFooter

      if( "$el" in footer ) {

        const footerHeight = footer.$el.getBoundingClientRect().height
        this.mainMinHeight = `calc( 100vh - ${this.pageHeaderHeight} - ${this.mainMarginBottom} - ${footerHeight}px )`

        return

      }
    }

    this.mainMinHeight = this.defaultMainMinHeight
  }

  // todo: random position for home over images
  // randomPosition(): {x: number, y: number, z: number} {
  //   return {
  //     x: Math.random() * this.$el.getBoundingClientRect().width,
  //     y: Math.random() * this.$el.getBoundingClientRect().height,
  //     z: Math.random() * 100,
  //   }
  // }

}
</script>

<style lang="scss">
  @import "../styles/params";

  #v-app {
    background: $site-theme-color;
  }

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
