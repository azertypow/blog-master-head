import { EnhanceApp } from 'vuepress-types'
import {IGalleryImageProp} from "./components/IGalleryImage"
import {ImageLazyLoad} from "./util/ImageLazyLoad"

export interface IStoreState {
  imageGallery: null | IGalleryImageProp
  currentsImageLazyLoad: ImageLazyLoad[]
}

export const store = {
  state: {
    imageGallery: null,
    currentsImageLazyLoad: [],
  } as IStoreState,

  setImageGallery(prop: IGalleryImageProp) {
    this.state.imageGallery = prop
  },

  clearImageGallery() {
    this.state.imageGallery = null
  },

  addCurrentsImageLazyLoad( item: ImageLazyLoad ) {
    this.state.currentsImageLazyLoad.push( item )
  },

  clearCurrentsImageLazyLoad() {
    this.state.currentsImageLazyLoad = []
  }
}

const enhanceApp: EnhanceApp = ({ Vue, router }) => {
  require("./styles/_main.scss")

  router.beforeEach((to, from, next) => {

    store.state.currentsImageLazyLoad.forEach(item => {
      item.abort()
    })

    store.clearCurrentsImageLazyLoad()

    next()
  })
}

export default enhanceApp
