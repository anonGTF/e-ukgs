import { doc, updateDoc } from "firebase/firestore";

export const useSaveUser = async (data: User): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, USER_CONSTANTS.collectionName, data.id)
    return updateDoc(docRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}