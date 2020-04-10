import { EnhanceApp } from 'vuepress-types'
import GalleryImage from "./components/GalleryImage.vue"
import {IGalleryImageProp} from "./components/IGalleryImage"
import GalleryVimeo    from "./components/GalleryVimeo.vue"
import SoundCloud     from "./components/SoundCloud.vue"
import Vimeo          from "./components/Vimeo.vue"
import ListOfArticles          from "./components/ListOfArticles.vue"

export interface IStoreState {
  imageGallery: null | IGalleryImageProp
}

export const store = {
  state: {
    imageGallery: null
  } as IStoreState,
  setImageGallery(prop: IGalleryImageProp) {
    this.state.imageGallery = prop
  },
  clearImageGallery() {
    this.state.imageGallery = null
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
