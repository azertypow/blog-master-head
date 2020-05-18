<template>
    <section class="v-vimeo">

        <div class="vi__vimeo-container" ref="vimeoContainer">
            <div class="vi__vimeo-player" ref="vimeoPlayer"></div>
        </div>

        <div class="vi__description"
             v-if="$slots.default">
            <slot></slot>
        </div>

    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
      mounted(this: Vimeo) {
        this.setVimeoPlayer().then(() => {
          this.openVimeo()
        })
      }
    })
    export default class Vimeo extends Vue {
      /**
       * vimeo url of video
       */
      @Prop({required: true}) src!: string

      private videoInfo?: IVimeoEmbedJSON

      async setVimeoPlayer() {
        const fetchResponse = await fetch(`https://vimeo.com/api/oembed.json?url=${this.src}&byline=false&color=FFFFFF&title=false&transparent=false`)

        this.videoInfo = await fetchResponse.json()
      }

      openVimeo() {
        if(this.videoInfo) {
          const vimeoContainer = this.$refs.vimeoPlayer
          if(vimeoContainer instanceof HTMLElement) {
            vimeoContainer.innerHTML = this.videoInfo.html
          }
        }
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
    @import "../styles/grid";

    .v-vimeo {
        margin-top: $line-height;
        margin-bottom: $line-height;
        position: relative;
    }

    .vi__description {
        @include column-container;
        position: relative;
        overflow: hidden;
        left: 0;
        align-items: baseline;
        //border: solid 1px;
        //padding-bottom: $line-height / 2;

        > * {
            margin: 0;
            font-size: $font-small--size;
            line-height: $font-small--line-height;
            white-space: nowrap;

            /*> br {*/
            /*    display: none !important;*/
            /*}*/

            /*
            + * {
                padding-left: $grid-gutter-width * 2;
            }
            */

            padding-left: $grid-gutter-width / 2;
            padding-right: $grid-gutter-width / 2;

            @include grid-coll-number(1 , 2);

        }
    }

    .vi__vimeo-player {
        background: black;
    }

    .vi__vimeo-container {
        position: relative;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;
    }
</style>

<style lang="scss">
    @import "../styles/params";
    .vi__vimeo-container {
        iframe {
            display: block;
            width: 100%;
            height: calc( 75vh - #{$nav-height} );
            margin: auto;
        }
    }
</style>
