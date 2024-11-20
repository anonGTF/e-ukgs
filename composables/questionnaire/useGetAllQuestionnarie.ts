import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";
import type { Questionnarie } from "~/models/questionnaire/Questionnarie";

export const useGetAllQuestionnaire = (): Ref<Questionnarie[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, QUESTIONNARIE_CONSTANTS.collectionName)
    const questionnaires = useCollection(collectionRef.withConverter<Questionnarie, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const questionnaire: Questionnarie = {
                id: snapshot.id,
                title: data[QUESTIONNARIE_CONSTANTS.titleAttr],
                type: data[QUESTIONNARIE_CONSTANTS.typeAttr],
                sections: data[QUESTIONNARIE_CONSTANTS.sectionsAttr]
            }
            return questionnaire
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return questionnaires
}