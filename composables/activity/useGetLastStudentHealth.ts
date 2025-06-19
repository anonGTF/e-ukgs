import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import type { LastActivity } from "~/models/activity/LastActivity"

export const useGetLastStudentHealth = async (schoolId: string, max: number): Promise<Either<String, LastActivity>> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName)
    const queryRef = query(
        collectionRef, 
        where(ACTIVITY_CONSTANTS.typeAttr, "==", ActivityType.TOOTH_HEALTH), 
        orderBy(ACTIVITY_CONSTANTS.startTimeAttr, 'desc'),
        limit(max)
    )

    try {
        const activities = (await getDocs(queryRef)).docs.map((d) => d.toActivity())
        const results = await Promise.all(activities.map(async (activity) => {
            const resultRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, ACTIVITY_CONSTANTS.collectionName, activity.id, TOOTH_HEALTH_CONSTANTS.collectionName)
            return (await getDocs(resultRef)).docs.map((d) => d.toToothHealth())
        }))
        const endResults = results.map((result) => {
            let totalOhis = 0
            let totalDmft = 0
            let totalGum = 0
            let count = 0
            
            result.forEach((data) => {
                totalOhis += data.ohis.totalScore
                totalDmft += data.dmft.totalScore
                totalGum += data.gums.score.averageScore
                count += 1
            })
            
            return [(totalOhis / count), (totalDmft / count), (totalGum / count)]
        })
        return makeRight({
            activities,
            data: endResults
        } satisfies LastActivity)
    } catch(error) {
        return makeLeft(error as string)
    }
}