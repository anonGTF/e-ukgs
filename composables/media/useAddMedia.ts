import { addDoc, collection } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Media } from "~/models/media/Media";

export const useAddMedia = async (
    data: Media
): Promise<Either<string, null>> => {
    const db = useFirestore()
    const collectionRef = collection(db, getMediaCollectionName(data.type))
    return addDoc(collectionRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}