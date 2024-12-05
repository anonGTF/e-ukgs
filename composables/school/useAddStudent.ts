import { addDoc, collection } from "firebase/firestore";

export const useAddStudent = async (schoolId: string, data: Student): Promise<Either<string, null>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, STUDENT_CONSTANTS.collectionName)
    return addDoc(collectionRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}