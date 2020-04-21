<template>
    <header class="v-page-header">
    </header>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

    @Component
    export default class PageHeader extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-page-header {
        position: relative;
        width: 100%;
        overflow: hidden;
        box-sizing: content-box;
        height: $header-article-height;
        padding-top: $nav-height;
    }
</style>
