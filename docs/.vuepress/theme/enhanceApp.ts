import { EnhanceApp } from 'vuepress-types'
import GalleryImage from "./components/GalleryImage.vue"
import {IGalleryImageProp} from "./components/IGalleryImage"
import Vimeo          from "./components/Vimeo.vue"

export interface IStoreState {
  imageGallery: null | IGalleryImageProp
}

export const store = {
  state: {
    imageGallery: null,
  } as IStoreState,
  setImageGallery(prop: IGalleryImageProp) {
    this.state.imageGallery = prop
  },
  clearImageGallery() {
    this.state.imageGallery = null
  },
}

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('GalleryImage', GalleryImage)
  Vue.component('Vimeo', Vimeo)
  require("./styles/index.scss")
}

export default enhanceApp
