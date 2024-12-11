import { doc, updateDoc } from "firebase/firestore"

export const useUpdateActivityStatus = async (schoolId: string, activityId: string, status: ActivityStatus): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId)
    return updateDoc(docRef, { status})
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}