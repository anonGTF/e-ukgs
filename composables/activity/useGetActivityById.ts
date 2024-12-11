import { doc, getDoc } from "firebase/firestore";

export const useGetActivityById = async (schoolId: string, id: string): Promise<Either<string, Activity>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kegiatan tidak ditemukan')
        }
        return makeRight(document.toActivity())
    })
    .catch((error) => makeLeft(error.message))
}