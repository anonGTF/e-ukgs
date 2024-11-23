import { collection, query, where, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";
import type { ToothHealth } from "~/models/tooth-health/ToothHealth";

export const useGetAllToothHealthByGroup = (groupId: string): Ref<ToothHealth[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, TOOTH_HEALTH_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(TOOTH_HEALTH_CONSTANTS.groupIdAttr, "==", groupId))
    const results = useCollection(queryRef.withConverter<ToothHealth, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const result: ToothHealth = {
                id: snapshot.id,
                studentId: data[TOOTH_HEALTH_CONSTANTS.studentIdAttr],
                groupId: data[TOOTH_HEALTH_CONSTANTS.groupIdAttr],
                periodId: data[TOOTH_HEALTH_CONSTANTS.periodIdAttr],
                ohis: data[TOOTH_HEALTH_CONSTANTS.ohisAttr],
                dmft: data[TOOTH_HEALTH_CONSTANTS.dmftAttr],
                referral: data[TOOTH_HEALTH_CONSTANTS.referralAttr]
            }
            return result
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return results
}