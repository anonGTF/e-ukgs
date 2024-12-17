import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";

export const useGetAllEntries = (schoolId: string, activityId: string): Ref<Questionnarie[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, QUESTIONNARIE_CONSTANTS.entriesCollectionName)
    const questionnaires = useCollection(collectionRef.withConverter<Questionnarie, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toQuestionnarie(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return questionnaires
}