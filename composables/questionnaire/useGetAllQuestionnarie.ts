import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";

export const useGetAllQuestionnaire = (): Ref<Questionnarie[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, QUESTIONNARIE_CONSTANTS.collectionName)
    const questionnaires = useCollection(collectionRef.withConverter<Questionnarie, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toQuestionnarie(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return questionnaires
}