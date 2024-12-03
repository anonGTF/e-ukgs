import { collection, getDocs, limit, query, where } from "firebase/firestore";

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
        return makeRight(document.toQuestionnarie())
    })
    .catch((error) => makeLeft(error.message))
}