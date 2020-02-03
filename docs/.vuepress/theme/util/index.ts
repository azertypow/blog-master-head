import {Vue} from "vue/types/vue"

export function isVue(instance: any): instance is Vue {
  return (instance as Vue).$el !== undefined
}
