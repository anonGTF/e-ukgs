import type { User } from "~/models/user/User";
import type { Either } from "~/models/base/Either";
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

export const useGetUserById = async (id: string): Promise<Either<string, User>> => {
  const db = useFirestore()
  const user = doc(db, USER_CONSTANTS.collectionName, id)
  return getDoc(user)
  .then((document) => {
    if (!document.exists() || document.data() == undefined) {
      return makeLeft('User tidak ditemukan')
    }
    const data = document.data()
    const role = data[USER_CONSTANTS.roleAttr]
    const user: User = {
      id: id,
      role: role,
      groupdId: role == "student" ? data[USER_CONSTANTS.groupId] : null
    }
    return makeRight(user)
  })
  .catch((error) => makeLeft(error.message))
}