import { collection, query, where, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetDoneActivitiesByType = (schoolId: string, type: ActivityType): Ref<Activity[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(ACTIVITY_CONSTANTS.typeAttr, "==", type), where(ACTIVITY_CONSTANTS.statusAttr, "in", [ActivityStatus.DONE, ActivityStatus.DROPPED]))
    return useCollection(queryRef.withConverter<Activity, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toActivity(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
}