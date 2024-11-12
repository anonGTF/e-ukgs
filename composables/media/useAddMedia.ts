import { addDoc, collection } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import { MediaType } from "~/models/media/MediaType";

export const useAddMedia = async (
    title: string,
    source: string, 
    type: MediaType
): Promise<Either<string, null>> => {
    const db = useFirestore()
    const collectionRef = collection(db, getMediaCollectionName(type))
    return addDoc(collectionRef, { title, source, type })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}