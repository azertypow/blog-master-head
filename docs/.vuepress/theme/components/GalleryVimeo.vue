<template>
    <section class="v-gallery-vimeo">
        <h1>gallery Vimeo component</h1>
        <p>url: {{this.src}}</p>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class GalleryVimeo extends Vue {
        @Prop({required: true}) src!: string
    }
</script>

<style lang="scss" scoped>
    .v-gallery-vimeo {

    }
</style>
