import { doc, updateDoc } from "firebase/firestore";

export const useSaveSchool = async (data: School): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, data.id)
    return updateDoc(docRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}