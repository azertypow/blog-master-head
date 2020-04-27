<template>
    <footer class="v-footer">
        <p>© HEAD — Genève | master media design, <span class="l-ui--link" @click="this.openContactWindow">Nicolas Baldran et David Héritier</span></p>
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

    .v-footer {
        box-sizing: border-box;
        border-top: solid 1px;
        height: $footer-height;
        display: flex;
        align-items: center;

        > * {
            margin: 0;
        }
    }
</style>
