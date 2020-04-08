<template>
    <section class="v-gallery-image">
        <h1>gallery images component</h1>
        <p>url: {{this.src}}</p>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class GalleryImage extends Vue {
        @Prop({required: true}) src!: string
    }
</script>

<style lang="scss" scoped>
    .v-gallery-image {

    }
</style>
