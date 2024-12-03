import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";

export const useGetAllMedia = (type: MediaType): Ref<Media[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, getMediaCollectionName(type))
    const mediaList = useCollection(collectionRef.withConverter<Media, DocumentData>({
        fromFirestore: (snapshot) => snapshot.toMedia(type),
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return mediaList
}

export const useGetAllVideos = (): Ref<Media[]> => useGetAllMedia(MediaType.VIDEO)

export const useGetAllEbooks = (): Ref<Media[]> => useGetAllMedia(MediaType.EBOOK)

export const useGetAllArticles = (): Ref<Media[]> => useGetAllMedia(MediaType.ARTICLE)