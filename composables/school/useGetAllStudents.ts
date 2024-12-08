import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter, useCollection } from "vuefire";

export const useGetAllStudents = (schoolId: string | undefined): Ref<Student[]> => {
    if (schoolId == undefined) return ref([])

    const db = useFirestore()
    const collectionRef = collection(db, SCHOOL_CONSTANTS.collectionName, schoolId, STUDENT_CONSTANTS.collectionName)
    const students = useCollection(collectionRef.withConverter<Student, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toStudent(),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return students
}