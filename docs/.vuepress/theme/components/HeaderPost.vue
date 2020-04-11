<template>
    <section class="v-header-post">
        <img :src="imageURL"
             v-for="imageURL of this.arrayOfImagesURL"
             class="v-header-post__img"
             alt=""
             :style="{transform: `translate3d(${randomPosition().x}px, ${randomPosition().y}px, ${randomPosition().z}px)`}"
        >
    </section>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from "vue-property-decorator";
    import {store} from "../enhanceApp"

    @Component
    export default class HeaderPost extends Vue {
      storeData = store.state

      private arrayOfImagesURL: string[] = []

      get imagesInCurrentPost() {
        return this.storeData.imagesInCurrentPage
      }

      @Watch('imagesInCurrentPost')
      onImagesInCurrentPostChange() {
        this.setImages()
      }

      setImages() {
        for( const imgElement of this.imagesInCurrentPost ) {
          this.updateImageURLArrayOnLoad(imgElement)
        }
      }

      updateImageURLArrayOnLoad(imageElement: HTMLImageElement) {
        imageElement.addEventListener("load",  () => {

          this.arrayOfImagesURL.push(imageElement.src)

        })
      }

      randomPosition(): {x: number, y: number, z: number} {
        return {
          x: Math.random() * this.$el.getBoundingClientRect().width,
          y: Math.random() * this.$el.getBoundingClientRect().height,
          z: Math.random() * 100,
        }
      }

    }
</script>

<style lang="scss" scoped>
    .v-header-post {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .v-header-post__img {
        display: block;
        position: absolute;
        top: -25%;
        left: -25%;
        width: calc( 100% / 2);
        height: calc( 100% / 1.5);
        object-fit: cover;
        object-position: top left;
    }

    // todo type
    // https://yourdaye.com/vitals/womens-health/sexual-health-coronavirus/
    // https://americaoffbalance.org/

</style>
