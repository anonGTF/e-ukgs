import type { Group } from "~/models/group/Group"
  
export const useGroupStore = defineStore(
    'group',
    () => {
        const groupId = ref<String | null>(null)

        const $reset = () => {
            groupId.value = null
        }

        return {
            groupId,
            $reset
        }
    },
    {
        persist: true
    }
)