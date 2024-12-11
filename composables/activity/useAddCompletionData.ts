import { doc, setDoc } from "firebase/firestore"

export const useAddCompletionData = async (schoolId: string, activityId: string, data: CompletionData): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, UPDATE_CONSTANTS.collectionName, UPDATE_CONSTANTS.completionDataAttr)
    return setDoc(docRef, {
        ...data,
        createdAt: new Date()
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}