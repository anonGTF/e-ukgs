import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter, useCollection } from "vuefire";

export const useGetAllSchools = (): Ref<School[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName)
    const schools = useCollection(collectionRef.withConverter<School, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toSchool(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return schools
}