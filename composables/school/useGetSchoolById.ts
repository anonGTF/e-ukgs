import { doc, getDoc } from "firebase/firestore";

export const useGetSchoolById = async (id: string): Promise<Either<string, School>> => {
    const db = useFirestore()
    const docRef = doc(db, SCHOOL_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kelompok tidak ditemukan')
        }
        return makeRight(document.toSchool())
    })
    .catch((error) => makeLeft(error.message))
}