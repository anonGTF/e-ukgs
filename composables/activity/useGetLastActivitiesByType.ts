import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"

export const useGetLastActivitiesByType = async (type: ActivityType, schoolId: string, max: number): Promise<Either<String, number[][]>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const queryRef = query(
        collectionRef, 
        where(ACTIVITY_CONSTANTS.typeAttr, "==", type), 
        orderBy(ACTIVITY_CONSTANTS.startTimeAttr, 'desc'),
        limit(max)
    )

    try {
        const activities = (await getDocs(queryRef)).docs.map((d) => d.toActivity())
        const results = await Promise.all(activities.map(async (activity) => {
            const resultRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activity.id, QUESTIONNARIE_CONSTANTS.entriesCollectionName)
            return (await getDocs(resultRef)).docs.map((d) => d.toQuestionnarie())
        }))
        const endResults = results.map((result) => {
            const totals: number[] = []
            const counts: number[] = []

            result.forEach((q) => {
                q.sections.forEach((section, index) => {
                    if (!totals[index]) {
                        totals[index] = 0
                        counts[index] = 0
                    }
                    totals[index] += section.score ?? 0
                    counts[index] += 1
                })
            })

            return totals.map((total, index) => total / counts[index])
        })
        return makeRight(endResults)
    } catch(error) {
        return makeLeft(error as string)
    }
}