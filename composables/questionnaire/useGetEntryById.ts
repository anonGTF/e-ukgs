import { doc, getDoc } from "firebase/firestore";

export const useGetEntryById = async (schoolId: string, activityId: string, studentId: string): Promise<Either<string, Questionnarie>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, QUESTIONNARIE_CONSTANTS.entriesCollectionName, studentId)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Entry tidak ditemukan')
        }
        return makeRight(document.toQuestionnarie())
    })
    .catch((error) => makeLeft(error.message))
}