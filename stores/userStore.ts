import type { Student } from "~/models/group/Student";
import type { Teacher } from "~/models/teacher/Teacher";
import type { User } from "~/models/user/User";

export const useUserStore = defineStore(
  'user', 
  () => {
    const user = ref<User | null>(null)
    const teacher = ref<Teacher | null>(null)
    const student = ref<Student | null>(null)
    const guestMode = ref(false)

    const $reset = () => {
      user.value = null
      teacher.value = null,
      student.value = null,
      guestMode.value = false
    }

    return {
      user,
      teacher, 
      student,
      guestMode,
      $reset
    }
  }, 
  {
    persist: true
  }
)