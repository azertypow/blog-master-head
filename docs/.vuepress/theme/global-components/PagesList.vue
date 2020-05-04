<template>
    <ul class="v-pages-list l-ui-list l-ui-list--small">
        <template v-for="page of $site.pages">
            <li v-if="page.path !== '/' && page.title !== $page.title">
                <RouterLink :to="page.path"
                   class="l-ui-link-no-style">{{page.title}}</RouterLink>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class PagesList extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-pages-list {
        text-transform: lowercase;
        margin-top: $line-height / 2;
    }
</style>
