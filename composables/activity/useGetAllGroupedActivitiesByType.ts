import { collectionGroup, query, where, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllGroupedActivitiesByType = (type: ActivityType): Ref<Activity[]> => {
    const db = useFirestore()
    const collectionGroupRef = query(collectionGroup(db, ACTIVITY_CONSTANTS.collectionName), where(ACTIVITY_CONSTANTS.typeAttr, "==", type), where(ACTIVITY_CONSTANTS.statusAttr, "==", ActivityStatus.ONPROGRESS))
    const activities = useCollection(collectionGroupRef.withConverter<Activity, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toActivity(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return activities
}