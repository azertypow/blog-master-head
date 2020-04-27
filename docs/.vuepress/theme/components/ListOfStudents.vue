<template>
    <aside class="v-list-of-students">

        <div v-if="listOfSpeakers">
            <div>Speakers</div>
            <div v-for="(externalLink, speaker) in listOfSpeakers " >

                <a v-if="externalLink.length"
                   :href="externalLink"
                   target="_blank"
                   class="l-ui-link"
                >{{speaker}}</a>

                <div v-else>{{speaker}}</div>

            </div>
        </div>

        <div v-if="listOfStudents">
            <div>Students</div>
            <div v-for="(externalLink, student) in listOfStudents " >

                <a v-if="externalLink.length"
                   :href="externalLink"
                   target="_blank"
                   class="l-ui-link"
                >{{student}}</a>

                <div v-else>{{student}}</div>

            </div>
        </div>

        <div v-if="listOfAssistants">
            <div>Assistants</div>
            <div v-for="(externalLink, assistant) in listOfAssistants " >

                <a v-if="externalLink.length"
                   :href="externalLink"
                   target="_blank"
                   class="l-ui-link"
                >{{assistant}}</a>

                <div v-else>{{assistant}}</div>

            </div>
        </div>

    </aside>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {cleanObjectToILinkFrontmatter, ILinkFrontmatter, IPageFrontmatter} from "../../IPageFrontmatter"

    @Component({
      mounted(this: ListOfStudents) {
        const repperElement = document.querySelector('.ts-fixed-repper')

        if (repperElement instanceof HTMLElement) {

          this.scrollEvent = () => {

            const elementIsFixed = this.$el.classList.contains(this.CLASS_NAME_WHEN_FIX)

            if (repperElement.getBoundingClientRect().top < this.HEIGHT_OF_HEADER && !elementIsFixed) {

              this.$el.classList.add(this.CLASS_NAME_WHEN_FIX)

            } else if (repperElement.getBoundingClientRect().top >= this.HEIGHT_OF_HEADER && elementIsFixed) {

              this.$el.classList.remove(this.CLASS_NAME_WHEN_FIX)

            }

          }

          window.addEventListener("scroll", this.scrollEvent)

        } else {
          console.error('no fixed repper')
        }
      }
    })
    export default class ListOfStudents extends Vue {

      private readonly HEIGHT_OF_HEADER = 60
      private readonly CLASS_NAME_WHEN_FIX = "fixed"

      scrollEvent?: (ev: Event) => any

      get listOfStudents(): ILinkFrontmatter | null {
        const students = ( this.$page.frontmatter as IPageFrontmatter ).students
        if ( students ) return cleanObjectToILinkFrontmatter( students )
        return null
      }

      get listOfSpeakers(): ILinkFrontmatter | null {
        const speakers = ( this.$page.frontmatter as IPageFrontmatter ).speakers
        if ( speakers ) return cleanObjectToILinkFrontmatter( speakers )
        return null
      }

      get listOfAssistants(): ILinkFrontmatter | null {
        const assistants = ( this.$page.frontmatter as IPageFrontmatter ).assistants
        if ( assistants ) return cleanObjectToILinkFrontmatter( assistants )
        return null
      }

    }
</script>

<style lang="scss" scoped>
    @import "../styles/params";

    .v-list-of-students {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 15px;
        line-height: 20px;
        font-weight: 800;

        &.fixed {
            position: fixed;
            width: calc(100% / 12 * 2);
            top: 60px;
            box-sizing: border-box;
            left: unset;
        }
    }
</style>
