import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { MediaType } from "~/models/media/MediaType";

export const useDeleteMedia = async (id: string, type: MediaType): Promise<Either<string, null>> => {
    const db = getFirestore()
    const docRef = doc(db, getMediaCollectionName(type), id)
    return deleteDoc(docRef)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error))
}