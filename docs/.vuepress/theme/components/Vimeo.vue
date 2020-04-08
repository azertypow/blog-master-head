<template>
    <section class="v-vimeo">

        <div class="vi__vimeo-container" ref="vimeoContainer">
            <div class="vi__vimeo-player" ref="vimeoPlayer"></div>
            <div class="vi__vimeo-cover" ref="vimeoCover"></div>
        </div>

        <div class="vi__description"
             v-if="$slots.default">
            <slot></slot>
        </div>

        <button class="vi__play" >play video</button>

    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
      mounted(this: Vimeo) {
        this.setVimeoPlayer()
      }
    })
    export default class Vimeo extends Vue {
      /**
       * vimeo url of video
       */
      @Prop({required: true}) src!: string

      private videoInfo?: IVimeoEmbedJSON

      async setVimeoPlayer() {
        console.log(this.$refs.vimeoContainer)

        const fetchResponse = await fetch(`https://vimeo.com/api/oembed.json?url=${this.src}&width=500`)

        this.videoInfo = await fetchResponse.json()

        const vimeoCover = this.$refs.vimeoCover
        if (vimeoCover instanceof HTMLDivElement) vimeoCover.style.backgroundImage = `url(${this.videoInfo?.thumbnail_url})`
      }

    }

    interface IVimeoEmbedJSON {
      type: string,
      version: string,
      provider_name: string,
      provider_url: string,
      title: string,
      author_name: string,
      author_url: string,
      is_plus: string,
      account_type: string,
      html: string,
      width: number,
      height: number,
      duration: number,
      description: string,
      thumbnail_url: string,
      thumbnail_width: number,
      thumbnail_height: number,
      thumbnail_url_with_play_button: string,
      upload_date: string,
      video_id: number,
      uri: string
    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-vimeo {
        height: 20rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
        position: relative;
    }

    .vi__description {
        $decal: $grid-gutter-width * 2;

        position: absolute;
        overflow: hidden;
        bottom: 1rem;
        left: 0;
        transform: translate(-$decal);
        width: calc(100% + #{$decal});
        font-family: $font-family-title;
        font-size: 2em;
        line-height: 4rem;
    }

    .vi__vimeo-container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .vi__vimeo-cover {
        width: 100%;
        height: 100%;
        background-color: #e2e2e2;
        /*background-repeat: no-repeat;*/
    }

    .vi__play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0;
        line-height: 2rem;
        background: white;
        border-color: black;
        cursor: pointer;
    }
</style>

<style lang="scss">
    .vi__vimeo-container {
        iframe {
            width: 100% !important;
            height: 100% !important;
        }
    }
</style>
