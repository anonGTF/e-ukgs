import { collection, getDocs, query, where } from "firebase/firestore"

export const useGetAllUsersBySchoolId = async (schoolId: string): Promise<Either<string, User[]>> => {
    const db = useFirestore()
    const collectionRef = collection(db, USER_CONSTANTS.collectionName)
    const queryRef = query(collectionRef, where(USER_CONSTANTS.schoolIdAttr, "==", schoolId))
    return getDocs(queryRef)
    .then((documents) => {
        if (documents.empty) {
            return makeLeft('User tidak ditemukan')
        }
        return makeRight(documents.docs.map((document) => document.toUser()))
    })
    .catch((error) => makeLeft(error.message))
}