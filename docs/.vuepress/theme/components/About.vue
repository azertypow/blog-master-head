<template>
    <section class="v-about">
        <div class="v-about__left"></div>

        <div class="v-about__center">
            <h5>Head of Department</h5>
            <h6>
                Alexia Mathieu
            </h6>
            <br>
            <h5>graphic design</h5>
            <h6 class="cap">font</h6>
            <h6>Inter, Inter Display</h6>
            <h6 class="cap">graphic / interaction design</h6>
            <h6>Nicolas BALDRAN and David HÉRITIER</h6>
        </div>

        <div class="v-about__right">
            <h5>Distortion and <em>Distortion series</em></h5>
            <h6>
                Distortion description, <em>Distortion series</em> conferencies.<br>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque enim excepturi maiores quos veritatis! Alias corporis delectus dolore quas qui rerum sequi suscipit. Excepturi exercitationem impedit nam rem tempora voluptatibus.
            </h6>
            <br>
            <br>
            <h6><a class="l-ui-link">link to</a></h6>
            <h6><a class="l-ui-link">link to</a></h6>
            <h6><a class="l-ui-link">link to</a></h6>
        </div>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class About extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/font-settings";
    @import "../styles/grid";

    .v-about {
        background-color: $site-color;
        color: $site-theme-color;
        @include column-container;
        padding-top: $line-height / 2;
        padding-bottom: $line-height / 2;
        align-items: baseline;
    }

    .v-about__left {
        @include grid-coll-number(2, 12);
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-about__center {
        @include font--2;
        @include grid-coll-number(4, 12);
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-about__right {
        @include font--2;
        @include grid-coll-number(6, 12);
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .cap {
        text-transform: uppercase;
    }
</style>
