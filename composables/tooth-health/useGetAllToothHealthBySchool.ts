import { collection, query, where, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";

export const useGetAllToothHealthBySchool = (schoolId: string): Ref<ToothHealth[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, TOOTH_HEALTH_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(TOOTH_HEALTH_CONSTANTS.schoolIdAttr, "==", schoolId))
    const results = useCollection(queryRef.withConverter<ToothHealth, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toToothHealth(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return results
}