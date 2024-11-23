import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Questionnarie, QuestionnarieType } from "~/models/questionnaire/Questionnarie";

export const useGetQuestionnarieByType = async (type: QuestionnarieType): Promise<Either<string, Questionnarie>> => {
    const db = useFirestore()
    const collectionRef = collection(db, QUESTIONNARIE_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(QUESTIONNARIE_CONSTANTS.typeAttr, "==", type), limit(1))
    return getDocs(queryRef)
    .then((snapshot) => {
        if (snapshot.empty) {
            return makeLeft('Kuesioner tidak ditemukan')
        }
        const document = snapshot.docs[0]
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kuesioner tidak ditemukan')
        }
        const data = document.data()
        const questionnarie: Questionnarie = {
            id: document.id,
            title: data[QUESTIONNARIE_CONSTANTS.titleAttr],
            type: data[QUESTIONNARIE_CONSTANTS.typeAttr],
            sections: data[QUESTIONNARIE_CONSTANTS.sectionsAttr]
        }
        return makeRight(questionnarie)
    })
    .catch((error) => makeLeft(error.message))
}