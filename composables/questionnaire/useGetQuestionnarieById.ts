import { doc, getDoc } from "firebase/firestore";

export const useGetQuestionnarieById = async (id: string): Promise<Either<string, Questionnarie>> => {
    const db = useFirestore()
    const docRef = doc(db, QUESTIONNARIE_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kuesioner tidak ditemukan')
        }
        return makeRight(document.toQuestionnarie())
    })
    .catch((error) => makeLeft(error.message))
}