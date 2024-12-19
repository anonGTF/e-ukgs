import { collection, getDocs, limit, query, where } from "firebase/firestore"

export const useGetToothHealthById = async (schoolId: string, activityId: string, studentId: string): Promise<Either<string, ToothHealth>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, TOOTH_HEALTH_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(TOOTH_HEALTH_CONSTANTS.studentIdAttr, "==", studentId), limit(1))
    return getDocs(queryRef)
    .then((snapshot) => {
        if (snapshot.empty) {
            return makeLeft('Kelompok tidak ditemukan')
        }
        return makeRight(snapshot.docs[0].toToothHealth())
    })
    .catch((error) => makeLeft(error.message))
}