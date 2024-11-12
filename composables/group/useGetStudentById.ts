import { doc, getDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Student } from "~/models/group/Student";

export const useGetStudentById = async (id: string, groupId: string): Promise<Either<string, Student>> => {
    const db = useFirestore()
    const docRef = doc(db, GROUP_CONSTANTS.collectionName, groupId, STUDENT_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Siswa tidak ditemukan')
        }
        const data = document.data()
        const student: Student = {
            id: id,
            userId: data[STUDENT_CONSTANTS.userIdAttr],
            name: data[STUDENT_CONSTANTS.nameAttr],
            gender: data[STUDENT_CONSTANTS.genderAttr]
        }
        return makeRight(student)
    })
    .catch((error) => makeLeft(error.message))
}