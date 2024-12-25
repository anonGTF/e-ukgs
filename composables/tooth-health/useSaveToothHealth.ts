import { doc, getFirestore, setDoc } from "firebase/firestore"

export const useSaveToothHealth = async (schoolId: string, activityId: string, data: ToothHealth): Promise<Either<string, null>> => {
    const db = getFirestore()
    const collectionRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, TOOTH_HEALTH_CONSTANTS.collectionName, data.id)
    return setDoc(collectionRef, {
        ...data
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}