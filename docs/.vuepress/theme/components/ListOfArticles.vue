<template>
    <section class="v-list-of-articles">
        <h1>list of articles component</h1>

        <ul>
            <li v-for="page of $site.pages">
                <h2>{{page.title}}</h2>
                <a :href="page.path" >see article</a>
            </li>
        </ul>

    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ListOfArticles extends Vue {

    }
</script>

<style lang="scss" scoped>
    .v-list-of-articles {

    }
</style>
