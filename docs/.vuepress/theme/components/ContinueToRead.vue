<template>
    <section class="v-continue-to-read">

        <div class="v-continue-to-read__container">

            <div class="v-continue-to-read__left">
                <h3>ne rien raté </h3>
                <div>
                    social links icons
                </div>
            </div>

            <div class="v-continue-to-read__right">
                <h3>next -></h3>
                <div>
                    next article title
                </div>
            </div>

        </div>

    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ContinueToRead extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "../styles/grid";
    @import "../styles/params";

    .v-continue-to-read {
        border-top: solid 1px $site-color;
    }

    .v-continue-to-read__container {
        @include column-container;
        max-width: 1280px;
        margin: auto;
    }

    .v-continue-to-read__left {
        @include grid-coll-number(1, 2);
        padding-top: $line-height;
        padding-bottom: $line-height;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;

        border-right: solid 1px $site-color;

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }

        > * {margin: 0}
    }

    .v-continue-to-read__right {
        @include grid-coll-number(1, 2);
        padding-top: $line-height;
        padding-bottom: $line-height;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }

        > * {margin: 0}
    }
</style>
