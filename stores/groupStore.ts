import type { Group } from "~/models/group/Group"
  
export const useGroupStore = defineStore(
    'group',
    () => {
        const group = ref<Group | null>(null)

        const $reset = () => {
            group.value = null
        }

        return {
            group,
            $reset
        }
    },
    {
        persist: true
    }
)