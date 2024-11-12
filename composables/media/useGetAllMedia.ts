import { collection, type DocumentData } from "firebase/firestore";
import { firestoreDefaultConverter } from "vuefire";
import type { Media } from "~/models/media/Media";
import { MediaType } from "~/models/media/MediaType";

export const useGetAllMedia = (type: MediaType): Ref<Media[]> => {
    const db = useFirestore()
    const collectionRef = collection(db, getMediaCollectionName(type))
    const mediaList = useCollection(collectionRef.withConverter<Media, DocumentData>({
        fromFirestore: (snapshot) => {
            const data = snapshot.data()
            const media: Media = {
                id: snapshot.id,
                title: data[MEDIA_CONSTANTS.titleAttr],
                source: data[MEDIA_CONSTANTS.sourceAttr],
                type
            }
            return media
        },
        toFirestore: firestoreDefaultConverter.toFirestore
    }))
    return mediaList
}

export const useGetAllVideos = (): Ref<Media[]> => useGetAllMedia(MediaType.VIDEO)

export const useGetAllEbooks = (): Ref<Media[]> => useGetAllMedia(MediaType.EBOOK)

export const useGetAllArticles = (): Ref<Media[]> => useGetAllMedia(MediaType.ARTICLE)