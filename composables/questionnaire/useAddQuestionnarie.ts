import { addDoc, collection, getFirestore } from "firebase/firestore";

export const useAddQuestionnaire = async (data: Questionnarie) => {
    const db = getFirestore()
    const collectionRef = collection(db, QUESTIONNARIE_CONSTANTS.collectionName)
    return addDoc(collectionRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}