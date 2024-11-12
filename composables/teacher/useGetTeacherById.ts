import { doc, getDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Teacher } from "~/models/teacher/Teacher";

export const useGetTeacherById = async (id: string): Promise<Either<string, Teacher>> => {
    const db = useFirestore()
    const docRef = doc(db, TEACHER_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Guru tidak ditemukan')
        }
        const data = document.data()
        const teacher: Teacher = {
            id: id,
            userId: data[TEACHER_CONSTANTS.userIdAttr],
            name: data[TEACHER_CONSTANTS.nameAttr],
            gender: data[TEACHER_CONSTANTS.genderAttr]
        }
        return makeRight(teacher)
    })
    .catch((error) => makeLeft(error.message))
}