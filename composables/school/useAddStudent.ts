import { addDoc, collection } from "firebase/firestore";

export const useAddStudent = async (data: Student): Promise<Either<string, null>> => {
    const db = useFirestore()
    const collectionRef = collection(db, STUDENT_CONSTANTS.collectionName)
    return addDoc(collectionRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}