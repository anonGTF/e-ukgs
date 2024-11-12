import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter, useCollection } from "vuefire";
import type { Group } from "~/models/group/Group";

export const useGetAllGroups = (): Ref<Group[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, GROUP_CONSTANTS.collectionName)
    const groups = useCollection(collectionRef.withConverter<Group, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const group: Group = {
                id: snapshot.id,
                name: data[GROUP_CONSTANTS.nameAttr],
                totalStudent: data[GROUP_CONSTANTS.totalStudentAttr]
            }
            return group
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return groups
}