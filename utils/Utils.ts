import { MediaType } from "~/models/media/MediaType";
import { 
    Essentials, 
    Heading, 
    Bold, 
    Italic, 
    Underline, 
    Strikethrough,
    FontColor,
    FontBackgroundColor,
    List,
    Alignment,
    Link,
    BlockQuote,
    Undo,
    Paragraph,
    TextTransformation,
    Indent,
    IndentBlock,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
} from 'ckeditor5';

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

export const parseToDate = ({ seconds, nanoseconds }: { seconds: number, nanoseconds: number}) => {
    if (typeof seconds !== 'number' || typeof nanoseconds !== 'number') {
        throw new Error("Invalid input: both 'seconds' and 'nanoseconds' must be numbers.");
    }
    
    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000
    return new Date(milliseconds)
}

export const formatPrice = (price: number) => {
    const numberFormatter = new Intl.NumberFormat("id-ID")
    return numberFormatter.format(price)
}

export const multipleChoiceLabel = [
    {
        label: "A",
        icon:  "mdi:alpha-a-box-outline",
        selectedIcon: "mdi:alpha-a"
    },
    {
        label: "B",
        icon: "mdi:alpha-b-box-outline",
        selectedIcon: "mdi:alpha-b"
    },
    {
        label: "C",
        icon: "mdi:alpha-c-box-outline",
        selectedIcon: "mdi:alpha-c"
    },
    {
        label: "D",
        icon: "mdi:alpha-d-box-outline",
        selectedIcon: "mdi:alpha-d"
    }
]

export const defaultCkEditorConfig = {
    plugins: [
        Essentials, 
        Heading, 
        Bold, 
        Italic, 
        Underline,
        Strikethrough,
        FontColor, 
        FontBackgroundColor, 
        List, 
        Link, 
        BlockQuote, 
        Alignment,
        Undo,
        Image,
        ImageCaption,
        ImageStyle,
        ImageResize,
        ImageToolbar,
        ImageUpload,
        Base64UploadAdapter,
        Paragraph,
        TextTransformation,
        Indent,
        IndentBlock
    ],
    toolbar: [
        'heading', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'outdent', 'indent','|',
        'fontColor', 'fontBackgroundColor', '|',
        'bulletedList', 'numberedList', '|',
        'alignment', '|',
        'link', 'blockQuote', '|',
        'uploadImage', 'insertTable', '|',
        'undo', 'redo','|',
    ],
    image: {
        resizeOptions: [
            {
                name: 'resizeImage:original',
                label: 'Default image width',
                value: null,
            },
            {
                name: 'resizeImage:50',
                label: '50% page width',
                value: '50',
            },
            {
                name: 'resizeImage:75',
                label: '75% page width',
                value: '75',
            },
        ],
        toolbar: [
            'imageTextAlternative', 'toggleImageCaption', '|',
            'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
            'resizeImage',
        ]
    },
}