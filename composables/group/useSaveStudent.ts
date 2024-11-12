import { doc, updateDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";

export const useSaveStudent = async (id: string, groupId: string, name: string, gender: string): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, GROUP_CONSTANTS.collectionName, groupId, STUDENT_CONSTANTS.collectionName, id)
    return updateDoc(docRef, { name, gender })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}