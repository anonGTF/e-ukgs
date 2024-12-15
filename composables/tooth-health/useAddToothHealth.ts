import { addDoc, collection, getFirestore } from "firebase/firestore"

export const useAddToothHealth = async (schoolId: string, activityId: string, data: ToothHealth): Promise<Either<string, null>> => {
    const db = getFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, TOOTH_HEALTH_CONSTANTS.collectionName)
    return addDoc(collectionRef, {
        ...data,
        createdAt: new Date()
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}