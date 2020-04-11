import { EnhanceApp } from 'vuepress-types'
import GalleryImage from "./components/GalleryImage.vue"
import {IGalleryImageProp} from "./components/IGalleryImage"
import GalleryVimeo    from "./components/GalleryVimeo.vue"
import SoundCloud     from "./components/SoundCloud.vue"
import Vimeo          from "./components/Vimeo.vue"
import ListOfArticles          from "./components/ListOfArticles.vue"

export interface IStoreState {
  imageGallery: null | IGalleryImageProp
  imagesInCurrentPage: HTMLImageElement[]
}

export const store = {
  state: {
    imageGallery: null,
    imagesInCurrentPage: [],
  } as IStoreState,
  setImageGallery(prop: IGalleryImageProp) {
    this.state.imageGallery = prop
  },
  clearImageGallery() {
    this.state.imageGallery = null
  },

  setImagesInCurrentPage(value: HTMLImageElement[]) {
    this.state.imagesInCurrentPage = value
  }
}

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('GalleryImage', GalleryImage)
  Vue.component('GalleryVimeo', GalleryVimeo)
  Vue.component('SoundCloud', SoundCloud)
  Vue.component('Vimeo', Vimeo)
  Vue.component('ListOfArticles', ListOfArticles)
  require("./styles/index.scss")
}

export default enhanceApp
