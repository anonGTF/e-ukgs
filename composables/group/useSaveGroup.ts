import { doc, updateDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";

export const useSaveGroup = async (id: string, name: string): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, GROUP_CONSTANTS.collectionName, id)
    return updateDoc(docRef, { name })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}