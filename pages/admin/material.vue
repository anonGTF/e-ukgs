<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Bahan Penyuluhan</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Video Edukasi</Text>
                <Button 
                    class="hidden sm:block" 
                    @click="openVideoModal(null)"
                >
                    Tambah Video
                </Button>
                <div class="flex sm:hidden justify-center btn btn-square bg-primary text-white" @click="openVideoModal(null)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <DataTable
                :headers="tableHeader"
                :is-empty="videoData.length == 0"
            >
                <tr v-for="(data, index) in videoData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <img 
                            :src="data.thumbnail"
                            class="w-full h-auto max-w-64 rounded-lg"
                        />
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white" @click="openPreviewModal(data)">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openVideoModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </DataTable>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Ebook</Text>
                <Button 
                    class="hidden sm:block" 
                    @click="openEbookModal(null)"
                >
                    Tambah Ebook
                </Button>
                <div class="flex sm:hidden btn btn-square bg-primary text-white" @click="openEbookModal(null)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <DataTable
                :headers="tableHeader"
                :is-empty="ebookData.length == 0"
            >
                <tr v-for="(data, index) in ebookData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <img 
                            :src="data.thumbnail"
                            class="w-full h-auto max-w-64 rounded-lg"
                        />
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white" @click="openPreviewModal(data)">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openEbookModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </DataTable>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Artikel</Text>
                <Button 
                    class="hidden sm:block" 
                    @click="openArticleModal(null)"
                >
                    Tambah Artikel
                </Button>
                <div class="flex sm:hidden drawer-button btn btn-square bg-primary text-white" @click="openArticleModal(null)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <DataTable
                :headers="tableHeader"
                :is-empty="articleData.length == 0"
            >
                <tr v-for="(data, index) in articleData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <img 
                            :src="data.thumbnail"
                            class="w-full h-auto max-w-64 rounded-lg"
                        />
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white" @click="openPreviewModal(data)">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openArticleModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </DataTable>
        </div>
    </div>

    <!-- MODAL FOR PREVIEW -->
    <dialog
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showPreviewModal }"
    >
        <div class="rounded-2xl bg-white p-4 w-full lg:w-[50%] min-h-[50%] lg:min-h-[60%] flex flex-col">
            <div class="flex flex-row justify-between items-center mb-2">
                <Text :typography="Typography.Label" class="font-semibold">Preview</Text>
                <btn 
                    class="btn btn-square flex justify-center bg-transparent text-content-non-essential"
                    @click="closeModal"
                >
                    <Icon name="mdi:close"/>
                </btn>
            </div>
            <template v-if="selectedType == MediaType.VIDEO">
                <iframe 
                    class="flex-1"
                    :src="youtubeSourceToEmbed(selectedSource)" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen
                ></iframe>
            </template>
            <template v-else-if="selectedType == MediaType.ARTICLE">
                <iframe :src="selectedSource" class="flex-1"></iframe>
            </template>
            <template v-else>
                <iframe :src="selectedSource" class="h-[80svh] w-full"></iframe>
            </template>
        </div>
    </dialog>
    <!-- END OF MODAL FOR PREVIEW -->

    <!-- MODAL FOR VIDEO -->
    <dialog 
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showVideoModal }"
    >
        <div class="modal-box">
            <Text :typography="Typography.H2">{{ selectedVideo?.id == "" ? "Tambah" : "Ubah" }} Data Video</Text>
            <Spacer height="h-6" />
            <TextField
                v-model="videoTitle"
                placeholder="Masukkan Judul"
                label="Judul"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="videoSource"
                type="text"
                placeholder="Masukkan Link Video"
                label="Link"
            />
            <Spacer height="h-4" />
            <FileInput
                label="Upload Thumbnail"
                file-type="image/*"
                @change="saveVideoThumbnail"
            />
            <Spacer height="h-6" />
            <div class="flex flex-row gap-2 w-full">
                <Button 
                    :type="ButtonType.Secondary"
                    class="flex-1"
                    @click="closeModal"
                >
                    Batal
                </Button>
                <Button
                    :loading="isLoading"
                    class="flex-1"
                    @click="saveVideo"
                >
                    {{ selectedVideo?.id == "" ? "Tambah" : "Simpan" }}
                </Button>
            </div>
        </div>
    </dialog>
    <!-- END OF MODAL FOR VIDEO -->

    <!-- MODAL FOR EBOOK -->
    <dialog 
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showEbookModal }"
    >
        <div class="modal-box">
            <Text :typography="Typography.H2">{{ selectedEbook?.id == "" ? "Tambah" : "Ubah" }} Data Ebook</Text>
            <Spacer height="h-6" />
            <TextField
                v-model="ebookTitle"
                placeholder="Masukkan Judul"
                label="Judul"
            />
            <Spacer height="h-4" />
            <FileInput
                label="Upload File Ebook (.pdf)"
                file-type=".pdf"
                @change="saveEbookFile"
            />
            <Spacer height="h-4" />
            <FileInput
                label="Upload Thumbnail"
                file-type="image/*"
                @change="saveEbookThumbnail"
            />
            <Spacer height="h-6" />
            <div class="flex flex-row gap-2 w-full">
                <Button 
                    :type="ButtonType.Secondary"
                    class="flex-1"
                    @click="closeModal"
                >
                    Batal
                </Button>
                <Button
                    :loading="isLoading"
                    class="flex-1"
                    @click="saveEbook"
                >
                    {{ selectedEbook?.id == "" ? "Tambah" : "Simpan" }}
                </Button>
            </div>
        </div>
    </dialog>
    <!-- END OF MODAL FOR EBOOK -->

    <!-- MODAL FOR ARTICLE -->
    <dialog 
        id="modal-article"
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showArticleModal }"
    >
        <div class="modal-box">
            <Text :typography="Typography.H2">{{ selectedArticle?.id == "" ? "Tambah" : "Ubah" }} Data Artikel</Text>
            <Spacer height="h-6" />
            <TextField
                v-model="articleTitle"
                placeholder="Masukkan Judul"
                label="Judul"
            />
            <Spacer height="h-4" />
            <FileInput
                label="Upload Thumbnail"
                file-type="image/*"
                @change="saveArticleThumbnail"
            />
            <Spacer height="h-4" />
            <ckeditor
                v-model="articleContent"
                :editor="ClassicEditor"
                :config="defaultCkEditorConfig"
            />
            <Spacer height="h-6" />
            <div class="flex flex-row gap-2 w-full">
                <Button 
                    :type="ButtonType.Secondary"
                    class="flex-1"
                    @click="closeModal"
                >
                    Batal
                </Button>
                <Button
                    :loading="isLoading"
                    class="flex-1"
                    @click="saveArticle"
                >
                    {{ selectedArticle?.id == "" ? "Tambah" : "Simpan" }}
                </Button>
            </div>
        </div>
    </dialog>
    <!-- END OF MODAL FOR ARTICLE -->
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';
    import { ToastType } from '~/components/attr/ToastAttr';
    import type { Media } from '~/models/media/Media';
    import { MediaType } from '~/models/media/MediaType';
    import { ClassicEditor } from 'ckeditor5';
    import 'ckeditor5/ckeditor5.css';
    import { defaultCkEditorConfig } from '~/utils/Utils';

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Bahan Penyuluhan",
            route: "/admin/material"
        }
    ])

    const tableHeader = ref([
        "",
        "Thumbnail",
        "Judul",
        "Link",
        ""
    ])

    const uiStore = useUiStore()

    const videoData = useGetAllVideos()
    const videoTitle = ref("")
    const videoSource = ref("")
    const videoThumbnail = ref<File | null | undefined>(null)
    const videoThumbnailPreview = ref("")
    const selectedVideo = ref<Media | null>(null)

    const ebookData = useGetAllEbooks()
    const ebookTitle = ref("")
    const ebookFile = ref<File | null | undefined>(null)
    const ebookThumbnail = ref<File | null | undefined>(null)
    const ebookThumbnailPreview = ref("")
    const selectedEbook = ref<Media | null>(null)

    const articleData = useGetAllArticles()
    const articleTitle = ref("")
    const articleThumbnail = ref<File | null | undefined>(null)
    const articleThumbnailPreview = ref("")
    const selectedArticle = ref<Media | null>(null)
    const articleContent = ref('<p>Masukkan konten artikel di sini</p>')

    const isLoading = ref(false)

    const showVideoModal = ref(false)
    const showEbookModal = ref(false)
    const showArticleModal = ref(false)
    const showPreviewModal = ref(false)
    const selectedSource = ref("")
    const selectedType = ref<MediaType | null>(null)

    const saveVideoThumbnail = (file: File | null | undefined) => { videoThumbnail.value = file }
    const saveEbookFile = (file: File | null | undefined) => { ebookFile.value = file }
    const saveEbookThumbnail = (file: File | null | undefined) => { ebookThumbnail.value = file }
    const saveArticleThumbnail = (file: File | null | undefined) => { articleThumbnail.value = file }

    const openVideoModal = (data: Media | null) => {
        if (data != null) {
            selectedVideo.value = data
            videoTitle.value = data.title
            videoSource.value = data.source
            videoThumbnailPreview.value = data.thumbnail
        }
        showVideoModal.value = true
    }

    const openEbookModal = (data: Media | null) => {
        if (data != null) {
            selectedEbook.value = data
            ebookTitle.value = data.title
            ebookThumbnailPreview.value = data.thumbnail
        }
        showEbookModal.value = true
    }

    const openArticleModal = (data: Media | null) => {
        if (data != null) {
            selectedArticle.value = data
            articleTitle.value = data.title
            articleThumbnailPreview.value = data.thumbnail
        }
        showArticleModal.value = true
    }

    const openPreviewModal = (data: Media) => {
        selectedType.value = data.type
        selectedSource.value = data.source
        showPreviewModal.value = true
    }

    const closeModal = () => {
        videoTitle.value = ""
        videoSource.value = ""
        videoThumbnail.value = null
        videoThumbnailPreview.value = ""
        selectedVideo.value = null

        ebookTitle.value = ""
        ebookFile.value = null
        ebookThumbnail.value = null
        ebookThumbnailPreview.value = ""
        selectedEbook.value = null

        articleTitle.value = ""
        articleContent.value = ""
        articleThumbnail.value = null
        articleThumbnailPreview.value = ""
        selectedArticle.value = null
        
        showVideoModal.value = false
        showEbookModal.value = false
        showArticleModal.value = false
        showPreviewModal.value = false
        selectedType.value = null
        selectedSource.value = ""
    }

    const saveVideo = async () => {
        let isValid = true
        if (videoTitle.value == "") {
            uiStore.showToast("Judul video tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (videoSource.value == "") {
            uiStore.showToast("Sumber video tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (selectedVideo.value != null && videoThumbnail.value == null) {
            uiStore.showToast("Thumbnail video tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (!isValid) return

        isLoading.value = true
        let thumbnail = selectedVideo.value?.thumbnail ?? ""
        if (thumbnail == "" || videoThumbnail.value != null) {
            const uploadThumbnailResult = await useUploadFile(videoThumbnail.value, "thumbnail")
            if (isLeft(uploadThumbnailResult)) {
                uiStore.showToast(`Tidak berhasil upload thumbnail ${unwrapEither(uploadThumbnailResult)}`, ToastType.ERROR)
                isLoading.value = false
                return
            }
            thumbnail = unwrapEither(uploadThumbnailResult)
        }

        const result = selectedVideo.value == null ? await useAddMedia({
            id: "",
            title: videoTitle.value,
            source: videoSource.value,
            thumbnail,
            type: MediaType.VIDEO
        } satisfies Media) : await useSaveMedia({
            ...selectedVideo.value,
            title: videoTitle.value,
            source: videoSource.value,
            thumbnail
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            closeModal()
        }
        isLoading.value = false
    }

    const saveEbook = async () => {
        let isValid = true
        if (ebookTitle.value == "") {
            uiStore.showToast("Judul ebook tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (selectedEbook.value != null && ebookFile.value == null) {
            uiStore.showToast("Sumber ebook tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (selectedEbook.value != null && ebookThumbnail.value == null) {
            uiStore.showToast("Thumbnail ebook tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (!isValid) return

        isLoading.value = true
        let thumbnail = selectedEbook.value?.thumbnail ?? ""
        if (thumbnail == "" || ebookThumbnail.value != null) {
            const uploadThumbnailResult = await useUploadFile(ebookThumbnail.value, "thumbnail")
            if (isLeft(uploadThumbnailResult)) {
                uiStore.showToast(`Tidak berhasil upload thumbnail ${unwrapEither(uploadThumbnailResult)}`, ToastType.ERROR)
                isLoading.value = false
                return
            }
            thumbnail = unwrapEither(uploadThumbnailResult)
        }

        let source = selectedEbook.value?.source ?? ""
        if (source == "" || ebookFile.value != null) {
            const uploadEbookResult = await useUploadFile(ebookFile.value, "ebook")
            if (isLeft(uploadEbookResult)) {
                uiStore.showToast(`Tidak berhasil upload ebook ${unwrapEither(uploadEbookResult)}`, ToastType.ERROR)
                isLoading.value = false
                return
            }
            source = unwrapEither(uploadEbookResult)
        }

        const result = selectedEbook.value == null ? await useAddMedia({
            id: "",
            title: ebookTitle.value,
            source,
            thumbnail,
            type: MediaType.EBOOK
        } satisfies Media) : await useSaveMedia({
            ...selectedEbook.value,
            title: ebookTitle.value,
            source,
            thumbnail
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            closeModal()
        }
        isLoading.value = false
    }

    const saveArticle = async () => {
        let isValid = true
        if (articleTitle.value == "") {
            uiStore.showToast("Judul artikel tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (selectedArticle.value != null && articleContent.value == "") {
            uiStore.showToast("Konten artikel tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (selectedArticle.value != null && articleThumbnail.value == null) {
            uiStore.showToast("Thumbnail artikel tidak boleh kosong", ToastType.ERROR)
            isValid = false
        }
        if (!isValid) return

        isLoading.value = true
        let thumbnail = selectedArticle.value?.thumbnail ?? ""
        if (thumbnail == "" || articleThumbnail.value != null) {
            const uploadThumbnailResult = await useUploadFile(articleThumbnail.value, "thumbnail")
            if (isLeft(uploadThumbnailResult)) {
                uiStore.showToast(`Tidak berhasil upload thumbnail ${unwrapEither(uploadThumbnailResult)}`, ToastType.ERROR)
                isLoading.value = false
                return
            }
            thumbnail = unwrapEither(uploadThumbnailResult)
        }

        let source = selectedArticle.value?.source ?? ""
        if (source == "" || articleContent.value != "") {
            const articleFile = new File([articleContent.value], `${articleTitle.value}.html`, { type: "text/html" })
            const uploadArticleResult = await useUploadFile(articleFile, "article")
            if (isLeft(uploadArticleResult)) {
                uiStore.showToast(`Tidak berhasil upload artikel ${unwrapEither(uploadArticleResult)}`, ToastType.ERROR)
                isLoading.value = false
                return
            }
            source = unwrapEither(uploadArticleResult)
        }

        const result = selectedArticle.value == null ? await useAddMedia({
            id: "",
            title: articleTitle.value,
            source,
            thumbnail,
            type: MediaType.ARTICLE
        } satisfies Media) : await useSaveMedia({
            ...selectedArticle.value,
            title: articleTitle.value,
            source,
            thumbnail
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            closeModal()
        }
        isLoading.value = false
    }

    const deleteMedia = async (data: Media) => {
        const result = await useDeleteMedia(data.id, data.type)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            uiStore.showToast("Data berhasil dihapus", ToastType.SUCCESS)
        }
    }

    useEventListener("keyup", (event: Event) => {
        if ((event as KeyboardEvent).code == "Escape") {
            closeModal()
        }
    })
</script>

<style>
#modal-article .modal-box {
    width: 100vw;
    max-width: none;
}

@media (min-width: 770px) {
    #modal-article .modal-box {
        width: 80vw;
        max-width: none;
    }
}
</style>