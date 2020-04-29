<template>
    <footer class="v-footer">


        <div class="v-footer__left"></div>

        <div class="v-footer__center">
            <h6>about ↓</h6>
        </div>

        <div class="v-footer__right">
            <h6 @click="this.openContactWindow" >
                <span class="l-ui-link-no-style">© 2020 Master Media Design, HEAD — Genève ↗</span>
            </h6>
<!--            <h6><span >Nicolas Baldran et David Héritier</span></h6>-->
        </div>
    </footer>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {

      openContactWindow() {
        const newWindow = window.open("", "contact", "height=500, width=500")
        if(newWindow) {
            newWindow.document.write(this.htmlPageContact)
        }
      }

      get htmlPageContact(): string {
        return `
        <p>bonjour,</p>
        <p>nous sommes David et Nicolas. description à écrire. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae consectetur cum deserunt ducimus facere id illum incidunt iure labore odio officiis porro quas ratione, tempora vero voluptate voluptatibus voluptatum?</p>
        <form>
        <textarea autofocus placeholder="rentrez en contact -> =)" style="resize: vertical;"></textarea>
        <input type="submit" value="send message">
        </form>
        `
      }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";
    @import "../styles/grid";
    @import "../styles/font-settings";

    .v-footer {
        @include column-container;
        overflow: hidden;
        box-sizing: border-box;
        border-top: solid 1px;
        height: $footer-height;
    }

    .v-footer__left {
        @include grid-coll-number(2, 12);
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-footer__center {
        @include font--2;
        @include grid-coll-number(4, 12);
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }

    .v-footer__right {
        @include font--2;
        padding: 0 $grid-gutter-width / 2;
        margin: 0;

        > * {
            margin: 0;
        }
    }
</style>
