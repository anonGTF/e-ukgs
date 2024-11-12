import { doc, updateDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";

export const useSaveTeacer = async (id: string, name: string, gender: string): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, TEACHER_CONSTANTS.collectionName, id)
    return updateDoc(docRef, { name, gender })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}