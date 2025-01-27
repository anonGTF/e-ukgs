import { doc, getDoc } from "firebase/firestore";

export const useGetArticleById = async (id: string): Promise<Either<string, Media>> => {
    const db = useFirestore()
    const docRef = doc(db, MEDIA_CONSTANTS.articleCollectionName, id)
    return getDoc(docRef)
    .then((document) => {
        if (!document.exists() || document.data() == undefined) {
            return makeLeft('Artikel tidak ditemukan')
        }
        return makeRight(document.toMedia(MediaType.ARTICLE))
    })
    .catch((error) => makeLeft(error.message))
}