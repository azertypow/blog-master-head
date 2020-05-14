import {PageFrontmatter} from "vuepress-types"

export interface IPageFrontmatter extends PageFrontmatter {
  professors?:    (string | ILinkFrontmatter) []
  students?:    (string | ILinkFrontmatter) []
  assistants?:  (string | ILinkFrontmatter) []
  date?: string
  cover?: string
  "cover-color"?: string
}

export interface ILinkFrontmatter {
  [key: string]: string
}

export function cleanObjectToILinkFrontmatter(object: (string | ILinkFrontmatter)[] ): ILinkFrontmatter {
  const cleanedObject: ILinkFrontmatter = {}

  object.forEach( (value: ILinkFrontmatter | string) => {

    if(typeof value === "string" ) {
      cleanedObject[value] = ""
    }

    else {
      for (let valueKey in value) {
        if ( value.hasOwnProperty( valueKey ) ) cleanedObject[valueKey] = value[valueKey]
      }
    }

  })

  return cleanedObject
}
