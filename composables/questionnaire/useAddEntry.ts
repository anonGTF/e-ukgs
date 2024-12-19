import { doc, getFirestore, setDoc } from "firebase/firestore"

export const useAddEntry = async (schoolId: string, activityId: string, data: Questionnarie, parentData: ParentData | null = null): Promise<Either<string, null>> => {
    const db = getFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, QUESTIONNARIE_CONSTANTS.entriesCollectionName, data.id)
    return setDoc(docRef, {
        ...data,
        parentData
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}