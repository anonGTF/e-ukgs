import { addDoc, collection, getFirestore } from "firebase/firestore";
import type { Either } from "~/models/base/Either";

export const useAddGroup = async (name: string): Promise<Either<string, null>> => {
    const db = getFirestore()
    const collectionRef = collection(db, GROUP_CONSTANTS.collectionName)
    return addDoc(collectionRef, {
        name,
        totalStudent: 0
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}