import { doc, updateDoc } from "firebase/firestore";

export const useSaveQuestionnarie = async (data: Questionnarie): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, QUESTIONNARIE_CONSTANTS.collectionName, data.id)
    return updateDoc(docRef, {...data})
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}