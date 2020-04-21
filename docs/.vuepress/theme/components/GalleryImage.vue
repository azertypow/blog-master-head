<template>
    <section class="v-gallery-image" @click="closeGallery">
        <img :src="prop.src" :alt="prop.alt">
        <div class="v-gallery-image__title-container">
            <h1 class="v-gallery-image__title">{{prop.alt}}</h1>
        </div>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {IGalleryImageProp} from "./IGalleryImage"
    import {store} from "../enhanceApp"

    @Component
    export default class GalleryImage extends Vue {
        @Prop({required: true, type: Object})
        prop!: IGalleryImageProp

      closeGallery() {
          store.clearImageGallery()
      }
    }

</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/grid";

    .v-gallery-image {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc( 100% - 60px);
        background: rgba(255, 255, 255, 0.75);

        box-sizing: border-box;

        cursor: pointer;
    }

    .v-gallery-image__title-container {
        width: 100%;
        padding-left: $grid-gutter-width;
        padding-right: $grid-gutter-width;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 60px;
    }

    .v-gallery-image__title {
        font-family: $font-serif;
        font-weight: 900;
        font-size: 45px;
        line-height: 50px;
        margin: 0;
        @include grid-gap-left-coll(2, 12);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 0 60px 60px 60px;
    }
</style>
