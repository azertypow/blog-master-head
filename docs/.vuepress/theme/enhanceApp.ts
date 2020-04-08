import { EnhanceApp } from 'vuepress-types'
import GalleryImage    from "./components/GalleryImage.vue"
import GalleryVimeo    from "./components/GalleryVimeo.vue"
import SoundCloud     from "./components/SoundCloud.vue"
import Vimeo          from "./components/Vimeo.vue"
import ListOfArticles          from "./components/ListOfArticles.vue"

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('GalleryImage', GalleryImage)
  Vue.component('GalleryVimeo', GalleryVimeo)
  Vue.component('SoundCloud', SoundCloud)
  Vue.component('Vimeo', Vimeo)
  Vue.component('ListOfArticles', ListOfArticles)
  require("./styles/index.scss")
}

export default enhanceApp
