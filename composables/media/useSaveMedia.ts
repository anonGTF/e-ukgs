import { doc, updateDoc } from "firebase/firestore";

export const useSaveMedia = async (data: Media): Promise<Either<string, null>> => {
    const db = useFirestore()
    const docRef = doc(db, getMediaCollectionName(data.type), data.id)
    return updateDoc(docRef, data)
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}