import { addDoc, collection } from "firebase/firestore";

export const useAddActivity = async (schoolId: string, data: Activity): Promise<Either<string, string>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    return addDoc(collectionRef, data)
    .then((data) => makeRight(data.id))
    .catch((error) => makeLeft(error.message))
}