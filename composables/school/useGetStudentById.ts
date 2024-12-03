import { doc, getDoc } from "firebase/firestore";

export const useGetStudentById = async (id: string, schoolId: string): Promise<Either<string, Student>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, schoolId, STUDENT_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Siswa tidak ditemukan')
        }
        return makeRight(document.toStudent())
    })
    .catch((error) => makeLeft(error.message))
}