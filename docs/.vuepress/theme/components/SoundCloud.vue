<template>
    <section class="v-sound-cloud">
        <h1>soundCloud component</h1>
        <p>url: {{this.src}}</p>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class SoundCloud extends Vue {
        @Prop({required: true}) src!: string
    }
</script>

<style lang="scss" scoped>
    .v-sound-cloud {

    }
</style>
