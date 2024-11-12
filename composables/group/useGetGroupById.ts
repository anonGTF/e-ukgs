import { doc, getDoc } from "firebase/firestore";
import type { Either } from "~/models/base/Either";
import type { Group } from "~/models/group/Group";

export const useGetGroupById = async (id: string): Promise<Either<string, Group>> => {
    const db = useFirestore()
    const docRef = doc(db, GROUP_CONSTANTS.collectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Kelompok tidak ditemukan')
        }
        const data = document.data()
        const group: Group = {
            id: id,
            name: data[GROUP_CONSTANTS.nameAttr],
            totalStudent: data[GROUP_CONSTANTS.totalStudentAttr]
        }
        return makeRight(group)
    })
    .catch((error) => makeLeft(error.message))
}