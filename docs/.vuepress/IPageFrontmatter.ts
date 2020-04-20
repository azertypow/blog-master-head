import {PageFrontmatter} from "vuepress-types"

export interface IPageFrontmatter extends PageFrontmatter {
  speakers?: string
  students?: string
  assistants?: string
  date?: string
  cover?: string
  "cover-color"?: string
}
