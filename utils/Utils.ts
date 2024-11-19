import { MediaType } from "~/models/media/MediaType";

export const getMediaCollectionName = (type: MediaType): string => {
    switch (type) {
        case MediaType.ARTICLE:
            return MEDIA_CONSTANTS.articleCollectionName
            
        case MediaType.EBOOK:
            return MEDIA_CONSTANTS.ebookCollectionName

        case MediaType.VIDEO:
            return MEDIA_CONSTANTS.videoCollectionName
    }
}

export const youtubeSourceToEmbed = (source: string): string => {
    const parts = source.split("youtu.be/")
    return `https://www.youtube.com/embed/${parts[1]}`
}