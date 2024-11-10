import { getAuth, signOut } from "firebase/auth"
import type { Either } from "~/models/base/Either"

export const useLogout = async (): Promise<Either<string, null>> => {
  const app = useFirebaseApp()
  const userStore = useUserStore()
  const groupStore = useGroupStore()
  return signOut(getAuth(app))
    .then(() => {
      userStore.$reset()
      groupStore.$reset()
      return makeRight(null)
    })
    .catch((error) => makeLeft(error.message))
}