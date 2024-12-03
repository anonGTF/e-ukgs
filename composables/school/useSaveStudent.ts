import { doc, updateDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";

export const useSaveStudent = async (schoolId: string, data: Student): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, STUDENT_CONSTANTS.collectionName, data.id)
    return updateDoc(docRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}