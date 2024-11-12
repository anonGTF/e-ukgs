import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter, useCollection } from "vuefire";
import type { Student } from "~/models/group/Student";

export const useGetAllStudents = (groupId: string): Ref<Student[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, GROUP_CONSTANTS.collectionName, groupId, STUDENT_CONSTANTS.collectionName)
    const students = useCollection(collectionRef.withConverter<Student, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const student: Student = {
                id: snapshot.id,
                name: data[STUDENT_CONSTANTS.nameAttr],
                gender: data[STUDENT_CONSTANTS.genderAttr],
                userId: data[STUDENT_CONSTANTS.userIdAttr]
            }
            return student
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return students
}