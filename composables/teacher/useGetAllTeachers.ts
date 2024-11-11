import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter, useCollection } from "vuefire";
import type { Teacher } from "~/models/teacher/Teacher";

export const useGetAllTeachers = (): Ref<Teacher[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, TEACHER_CONSTANTS.collectionName)
    const teachers = useCollection(collectionRef.withConverter<Teacher, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const teacher: Teacher = {
                id: data[TEACHER_CONSTANTS.userIdAttr],
                name: data[TEACHER_CONSTANTS.nameAttr],
                gender: data[TEACHER_CONSTANTS.genderAttr]
            }
            return teacher
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return teachers
}