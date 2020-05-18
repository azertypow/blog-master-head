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
            <h6>Distortion is a collection of special projects realized by students and professors in Master Media Design at HEAD&nbsp;–&nbsp;Genève. It is comprised of artefacts, installations, field trips, interviews and articles. Projects are born out of reflexions from our conference cycle called Distortion Series. We are currently focusing on two main topics: AI Cultures, the importance of artificial intelligence in the contemporary cultures of design and Technoshpere(s), the role of designers in the ecological transition.</h6>
            <br>
            <h6><span class="l-font-tab-number">20.02.2020 </span><a class="l-ui-link" href="https://www.hesge.ch/head/en/node/5205"                                              >Technosphere(s)</a></h6>
            <h6><span class="l-font-tab-number">17.10.2020 </span><a class="l-ui-link" href="https://www.hesge.ch/head/en/node/5205"                                              >Conference AI CULTURES</a></h6>
            <h6><span class="l-font-tab-number">07.05.2019 </span><a class="l-ui-link" href="https://www.hesge.ch/head/en/event/2019/distortions-series-rencontre-james-bridle"   >Lecture by James Bridle</a></h6>
            <h6><span class="l-font-tab-number">30.04.2019 </span><a class="l-ui-link" href="https://www.hesge.ch/head/en/event/2019/distortion-series-rencontre-adam-harvey"     >Lecture by Adam Harvey</a></h6>
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
        padding-top: $font-small--line-height;
        padding-bottom: $font-small--line-height;
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
