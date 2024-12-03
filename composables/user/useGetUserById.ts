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
    return makeRight(document.toUser())
  })
  .catch((error) => makeLeft(error.message))
}