import { EnhanceApp } from 'vuepress-types'
import {IGalleryImageProp} from "./components/IGalleryImage"

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
  require("./styles/_main.scss")
}

export default enhanceApp
