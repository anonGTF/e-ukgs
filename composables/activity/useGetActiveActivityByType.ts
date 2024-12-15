import { collection, getDocs, limit, query, where } from "firebase/firestore"

export const useGetActiveActivityByType = async (schoolId: string, type: ActivityType): Promise<Either<string, Activity>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(ACTIVITY_CONSTANTS.typeAttr, "==", type), where(ACTIVITY_CONSTANTS.statusAttr, "==", ActivityStatus.ONPROGRESS), limit(1))
    return getDocs(queryRef)
    .then((snapshot) => {
        if (snapshot.empty) {
            return makeLeft('Kegiatan tidak ditemukan')
        }
        return makeRight(snapshot.docs[0].toActivity())
    })
    .catch((error) => makeLeft(error.message))
}