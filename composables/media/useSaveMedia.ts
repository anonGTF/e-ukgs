import { doc, updateDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import { MediaType } from "~/models/media/MediaType";

export const useSaveMedia = async (
    id: string, 
    title: string,
    source: string, 
    type: MediaType
): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, getMediaCollectionName(type), id)
    return updateDoc(docRef, { title, source })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}