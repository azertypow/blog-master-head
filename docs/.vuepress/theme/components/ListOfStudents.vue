<template>
    <aside class="v-list-of-students">

        <div v-if="listOfProfessors">
            <div class="v-list-of-students__section-title">professors</div>
            <div v-for="(externalLink, professors) in listOfProfessors " >

                <a v-if="externalLink.length"
                   :href="externalLink"
                   target="_blank"
                   class="l-ui-link"
                >{{professors}}</a>

                <div v-else>{{professors}}</div>

            </div>
        </div>

        <div v-if="listOfStudents">
            <div class="v-list-of-students__section-title">students</div>
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
            <div class="v-list-of-students__section-title">assistants</div>
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

        this.scrollEvent = () => {
          this.setPosition()
        }

        window.addEventListener("scroll", this.scrollEvent)

        this.setPosition()

      },
      updated(this: ListOfStudents) {
        this.setPosition()
      }
    })
    export default class ListOfStudents extends Vue {

      private readonly HEIGHT_OF_HEADER = 60
      private readonly CLASS_NAME_WHEN_FIX = "fixed"

      scrollEvent?: (ev: Event) => any

      setPosition() {

        const repperElement = document.querySelector('.ts-fixed-repper') || undefined

        if (repperElement instanceof HTMLElement) {
          const elementIsFixed = this.$el.classList.contains(this.CLASS_NAME_WHEN_FIX)

          if (repperElement.getBoundingClientRect().top < this.HEIGHT_OF_HEADER && !elementIsFixed) {

            this.$el.classList.add(this.CLASS_NAME_WHEN_FIX)

          } else if (repperElement.getBoundingClientRect().top >= this.HEIGHT_OF_HEADER && elementIsFixed) {

            this.$el.classList.remove(this.CLASS_NAME_WHEN_FIX)

          }
        }

      }

      get listOfStudents(): ILinkFrontmatter | null {
        const students = ( this.$page.frontmatter as IPageFrontmatter ).students
        if ( students ) return cleanObjectToILinkFrontmatter( students )
        return null
      }

      get listOfProfessors(): ILinkFrontmatter | null {
        const professors = ( this.$page.frontmatter as IPageFrontmatter ).professors
        if ( professors ) return cleanObjectToILinkFrontmatter( professors )
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
    @import "../styles/font-settings";

    .v-list-of-students {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;
        width: calc(100% / 12 * 2);

        &.fixed {
            position: fixed;
            top: $nav-height + $font-small--line-height;
            box-sizing: border-box;
            left: unset;
        }

        > * {
            @include font--2;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .v-list-of-students__section-title {
        //padding-left: $font-small--line-height;
    }

</style>
