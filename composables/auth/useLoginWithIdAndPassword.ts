import { getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth"
import type { Either } from "~/models/base/Either"

export const useLoginWithIdAndPassword = async (id: string, password: string): Promise<Either<string, UserCredential>> => {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const domain = 'e-ukgs.web.app'
  const idWithDomain = `${id}@${domain}`
  return signInWithEmailAndPassword(auth, idWithDomain, password)
    .then((userCred) => makeRight(userCred))
    .catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        return makeLeft('ID atau password yang Anda masukkan salah')
      } else {
        return makeLeft(error.message)
      }
    })
}