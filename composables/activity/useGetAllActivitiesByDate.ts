import { collection, query, where, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllActivitiesByDate = (schoolId: string, startDate: Date, endDate: Date): Ref<Activity[]> => {
    if (startDate == undefined || endDate == undefined) return ref([])

    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(ACTIVITY_CONSTANTS.startTimeAttr, ">=", startDate), where(ACTIVITY_CONSTANTS.startTimeAttr, "<=", endDate))
    const activities = useCollection(queryRef.withConverter<Activity, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toActivity(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return activities
}