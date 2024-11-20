import { doc, getDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Questionnarie } from "~/models/questionnaire/Questionnarie";

export const useGetQuestionnarieById = async (id: string): Promise<Either<string, Questionnarie>> => {
    const db = useFirestore()
    const docRef = doc(db, QUESTIONNARIE_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kuesioner tidak ditemukan')
        }
        const data = document.data()
        const questionnarie: Questionnarie = {
            id: id,
            title: data[QUESTIONNARIE_CONSTANTS.titleAttr],
            type: data[QUESTIONNARIE_CONSTANTS.typeAttr],
            sections: data[QUESTIONNARIE_CONSTANTS.sectionsAttr]
        }
        return makeRight(questionnarie)
    })
    .catch((error) => makeLeft(error.message))
}