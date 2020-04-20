<style>
  @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
</style>

<template>
  <div id="v-app">

    <MmdNav></MmdNav>

    <header ref="articleHeader"
            class="v-app__article-header">

            <HeaderPost></HeaderPost>

    </header>

    <main>

      <h1
              v-if="$page.path !== '/'"
              class="v-app__article-title"
              v-html="this.articleTitle"></h1>

      <section>

        <ListOfStudents v-if="listOfStudents"></ListOfStudents>

        <Content
                ref="articlesContent"
                class="v-app__article-content ts-fixed-repper"
        />
      </section>
    </main>

    <transition name="fade">
      <GalleryImage class="to-animate" v-if="storeData.imageGallery" :prop="storeData.imageGallery"></GalleryImage>
    </transition>

    <footer>
<!--      <p>footer</p>-->
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {isVue} from "../util"
import {store} from "../enhanceApp"
import ListOfStudents from "../components/ListOfStudents.vue"
import HeaderPost from "../components/HeaderPost.vue"
import {IPageFrontmatter} from "../../IPageFrontmatter"
import MmdNav from "../components/MmdNav.vue"

@Component({
  components: {MmdNav, HeaderPost, ListOfStudents},
  mounted(this: Layout) {
    this.$nextTick(() => {
      this.updateHeaderVariables()
      this.setImageLayout()
      this.setImageInPostStoreList()
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
    if (this.storeData.imageGallery !== null) store.clearImageGallery()
  }

  get listOfStudents(): string | null {
    return (this.$page.frontmatter as IPageFrontmatter).students || null
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

  setImageInPostStoreList() {

    const imgInPost = this.$el.querySelectorAll("img")

    const arrayOfImgPostUrl: HTMLImageElement[] = []

    imgInPost.forEach(img => {

      if(img.src.length > 0) {
        arrayOfImgPostUrl.push(img)
      }

    })

    store.setImagesInCurrentPage(arrayOfImgPostUrl)

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
