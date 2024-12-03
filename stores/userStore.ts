export const useUserStore = defineStore(
  'user', 
  () => {
    const user = ref<User | null>(null)
    const school = ref<School | null>(null)

    const $reset = () => {
      user.value = null
      school.value = null
    }

    return {
      user,
      school,
      $reset
    }
  }, 
  {
    persist: true
  }
)