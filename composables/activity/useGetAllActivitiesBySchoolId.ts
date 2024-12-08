import { collection, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllActivitiesBySchoolId = (schoolId: string): Ref<Activity[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const activities = useCollection(collectionRef.withConverter<Activity, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toActivity(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return activities
}