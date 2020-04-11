<template>
    <section class="v-header-post">
        <img v-if="this.arrayOfImagesURL[0]"
             :src="this.arrayOfImagesURL[0]"
             class="v-header-post__img"
             alt=""
             :style="{transform: `translate3d(${randomPosition().x}px, ${randomPosition().y}px, ${randomPosition().z}px)`}"
        >
        <img v-for="imageURL of this.arrayOfImagesURL"
             :src="imageURL"
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
        left: 5%;
        width: 90px;
        height: 180px;
        object-fit: cover;
        object-position: top left;

        &:nth-child(1),
        &:nth-child(2) {
            transform: none !important;
            z-index: 10;
            height: 100%;
            object-fit: cover;
        }

        &:nth-child(1) {
            top: 0;
            left: auto;
            right: calc(100% / 12 * 10);
            width: calc(100% / 12 * 2);
            object-position: top right;
        }

        &:nth-child(2) {
            top: 0;
            right: auto;
            left: calc(100% / 12 * 11);
            width: calc(100% / 12 * 4);
            object-position: bottom left;
        }
    }

    // todo type
    // https://yourdaye.com/vitals/womens-health/sexual-health-coronavirus/
    // https://americaoffbalance.org/

</style>
