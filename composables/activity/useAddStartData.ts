import { doc, setDoc } from "firebase/firestore"

export const useAddStartData = async (schoolId: string, activityId: string, data: StartData): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, UPDATE_CONSTANTS.collectionName, UPDATE_CONSTANTS.startDataAttr)
    return setDoc(docRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}