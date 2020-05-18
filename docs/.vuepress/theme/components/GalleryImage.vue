<template>
    <section class="v-gallery-image" @click="closeGallery">

        <img :src="prop.src" :alt="prop.alt">

        <div class="v-gallery-image__bottom-box">
            <div class="v-gallery-image__bottom">
                <h6 class="v-gallery-image__bottom__title">{{prop.alt}}</h6>
            </div>
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
        height: calc( 100% - #{$nav-height});
        background: rgba(255, 255, 255, 0.9);
        z-index: 100;
        box-sizing: border-box;

        cursor: pointer;
    }

    .v-gallery-image__bottom-box {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: $line-height / 4;
    }

    .v-gallery-image__bottom {
        @include column-container;
        width: 100%;
        margin: auto;
        max-width: 1280px;
    }

    .v-gallery-image__bottom__title {
        margin: 0;
        @include grid-gap-left-coll(2, 12);
        box-sizing: border-box;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 0 $nav-height $nav-height $nav-height;
    }
</style>
