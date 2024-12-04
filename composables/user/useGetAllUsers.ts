import { collection, type DocumentData } from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export const useGetAllUsers = (): Ref<User[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, USER_CONSTANTS.collectionName)
    const users = useCollection(collectionRef.withConverter<User, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toUser(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return users
}