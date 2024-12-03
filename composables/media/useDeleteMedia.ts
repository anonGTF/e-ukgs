import { deleteDoc, doc, getFirestore } from "firebase/firestore";

export const useDeleteMedia = async (id: string, type: MediaType): Promise<Either<string, null>> => {
    const db = getFirestore()
    const docRef = doc(db, getMediaCollectionName(type), id)
    return deleteDoc(docRef)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error))
}