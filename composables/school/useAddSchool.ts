import { addDoc, collection, getFirestore } from "firebase/firestore";

export const useAddSchool = async (data: School): Promise<Either<string, null>> => {
    const db = getFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName)
    return addDoc(collectionRef, {
        ...data,
        totalStudent: 0
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}