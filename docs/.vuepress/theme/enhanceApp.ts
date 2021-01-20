import { EnhanceApp } from 'vuepress-types'
import {IGalleryImageProp} from "./components/IGalleryImage"
import {ImageLazyLoad} from "./util/ImageLazyLoad"
import {FontIsLoading} from "./util/FontIsLoading"

export interface IStoreState {
  imageGallery: null | IGalleryImageProp
  currentsImageLazyLoad: ImageLazyLoad[]
  showAppPage: boolean,
}

export const store = {
  state: {
    imageGallery: null,
    currentsImageLazyLoad: [],
    showAppPage: true,
  } as IStoreState,

  setImageGallery( prop: IGalleryImageProp ) {
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
  },

  setShowAppPage( value: boolean ) {
    this.state.showAppPage = value
  },
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

// const fontLoadingWatcher = new FontIsLoading("InterText", () => {
//
// })

export default enhanceApp
