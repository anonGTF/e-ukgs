import { collection, doc, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllUpdates = (schoolId: string, activityId: string) => {
    const db = useFirestore()
    const updateRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activityId, UPDATE_CONSTANTS.collectionName)
    const budgetPlanRef = doc(updateRef, UPDATE_CONSTANTS.budgetPlanAttr)
    const startDataRef = doc(updateRef, UPDATE_CONSTANTS.startDataAttr)
    const completionDataRef = doc(updateRef, UPDATE_CONSTANTS.completionDataAttr)

    const budgetPlan = useDocument(budgetPlanRef.withConverter<BudgetPlan, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toBudgetPlan(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))

    const startData = useDocument(startDataRef.withConverter<StartData, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toStartData(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))

    const completionData = useDocument(completionDataRef.withConverter<CompletionData, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toCompletionData(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))

    return {
        budgetPlan,
        startData,
        completionData
    }
}