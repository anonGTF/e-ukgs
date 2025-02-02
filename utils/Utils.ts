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
    Autoformat,
    CloudServices,
    MediaEmbed,
    Mention,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableColumnResize,
    TableToolbar,
    Plugin,
    type HeadingOption
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

export const getActivityTimeFormatted = (activity: Activity) => {
    const start = useDateFormat(activity.startTime, "DD MMM YYYY HH:mm", { locales: "id-ID" })
    const end = useDateFormat(
        activity.endTime, 
        (activity.startTime.getDate() == activity.endTime.getDate() && activity.startTime.getMonth() == activity.endTime.getMonth() && activity.startTime.getFullYear() == activity.endTime.getFullYear()) ? "HH:mm" : "DD MMM YYYY HH:mm", 
        { locales: "id-ID" }
    )
    return `${start.value} - ${end.value}`
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
        IndentBlock,
        Autoformat,
        CloudServices,
        MediaEmbed,
        Mention,
        PasteFromOffice,
        PictureEditing,
        Table,
        TableColumnResize,
        TableToolbar
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
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
        ] as HeadingOption[]
    },
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
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://'
    },
    table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    },
    placeholder: "Masukkan konten artikel",
    ui: {
        poweredBy: {
            label: null,
            position: "border" as const,
            side: "right" as const,
            horizontalOffset: 0,
            verticalOffset: 0
        }
    }
}

export const getWhatsappParentLink = (parentNumber: string, referralLetterLink: string) => 
    "https://wa.me/" + parentNumber + 
    "?text=Kepada Orang tua/wali Murid. Setelah kami lakukan pemeriksaan kesehatan gigi, diperlukan pemeriksaan lebih lanjut. Kami buatkan surat rujukan yang bisa Anda bawa ketika datang ke Puskesmas/RS. Surat rujukan bisa Anda akses pada link berikut:%0a%0a" + 
    encodeURIComponent(referralLetterLink.replace(/\/o\/(.*?)(?=\?alt=media)/, (_, p1) => `/o/${p1.replace(/\//g, "%2F")}`).replace(/%/g, "%25"))

export const openExternalLink = (link: string) => navigateTo(
    link, 
    {
        external: true,
        open: { target: '_blank' }
    }
)