import { collection, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllToothHealth = (schoolId: string, activityId: string): Ref<ToothHealth[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, TOOTH_HEALTH_CONSTANTS.collectionName)
    const results = useCollection(collectionRef.withConverter<ToothHealth, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toToothHealth(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return results
}