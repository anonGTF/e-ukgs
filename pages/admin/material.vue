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
                    @click="openModal(MediaType.VIDEO)"
                >
                    Tambah Video
                </Button>
                <div class="flex sm:hidden justify-center btn btn-square bg-primary text-white" @click="openModal(MediaType.VIDEO)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <Table
                :headers="tableHeader"
                :is-empty="videoData.length == 0"
            >
                <tr v-for="(data, index) in videoData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white" @click="openVideoModal(data.source)">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openEditModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Ebook</Text>
                <Button 
                    class="hidden sm:block" 
                    @click="openModal(MediaType.EBOOK)"
                >
                    Tambah Ebook
                </Button>
                <div class="flex sm:hidden btn btn-square bg-primary text-white" @click="openModal(MediaType.EBOOK)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <Table
                :headers="tableHeader"
                :is-empty="ebookData.length == 0"
            >
                <tr v-for="(data, index) in ebookData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openEditModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Artikel</Text>
                <Button 
                    class="hidden sm:block" 
                    @click="openModal(MediaType.ARTICLE)"
                >
                    Tambah Artikel
                </Button>
                <div class="flex sm:hidden drawer-button btn btn-square bg-primary text-white" @click="openModal(MediaType.ARTICLE)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <Table
                :headers="tableHeader"
                :is-empty="articleData.length == 0"
            >
                <tr v-for="(data, index) in articleData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.source }}</Text>
                    </td>
                    <td>
                        <div class="flex flex-row gap-2 justify-end">
                            <div class="btn btn-square flex justify-center bg-sky-400 text-white">
                                <Icon name="mdi:launch" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-emerald-400 text-white" @click="openEditModal(data)">
                                <Icon name="mdi:pencil" size="24px"/>
                            </div>
                            <div class="btn btn-square flex justify-center bg-red-500 text-white" @click="deleteMedia(data)">
                                <Icon name="mdi:trash-can" size="24px"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
    </div>
    <dialog 
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showUpsertModal }"
    >
        <div class="modal-box">
            <Text :typography="Typography.H2">{{ modalTitle }}</Text>
            <Spacer height="h-6" />
            <TextField
                v-model="title"
                placeholder="Masukkan Judul"
                label="Judul"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="source"
                type="text"
                placeholder="Masukkan Sumber Bahan (link)"
                label="Link"
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
                    @click="saveMedia"
                >
                    {{ modalActionLabel }}
                </Button>
            </div>
        </div>
    </dialog>
    <dialog
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showVideoModal }"
    >
        <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=0m20dx9lAFAjCzoU" 
            title="YouTube video player" f
            rameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen
        ></iframe>
    </dialog>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';
    import type { Media } from '~/models/media/Media';
    import { MediaType } from '~/models/media/MediaType';

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
        "Judul",
        "Link",
        ""
    ])

    const videoData = useGetAllVideos()
    const ebookData = useGetAllEbooks()
    const articleData = useGetAllArticles()
    const editMode = ref(false)
    const title = ref("")
    const source = ref("")
    const selectedType = ref<MediaType | null>(null)
    const selectedId = ref("")
    const isLoading = ref(false)
    const showUpsertModal = ref(false)
    const showVideoModal = ref(false)
    const showEbookModal = ref(false)
    const showArticleModal = ref(false)
    
    const modalTitle = computed(() => {
        const label = editMode.value ? "Edit" : "Tambah"
        const type = selectedType.value == MediaType.VIDEO ? "Video" : selectedType.value == MediaType.EBOOK ? "Ebook" : "Artikel"
        return `${label} Data ${type}`
    })

    const modalActionLabel = computed(() => editMode.value ? "Simpan" : "Tambahkan")

    const openModal = (type: MediaType) => {
        selectedType.value = type
        showUpsertModal.value = true
    }

    const openEditModal = (data: Media) => {
        title.value = data.title
        source.value = data.source
        selectedType.value = data.type
        selectedId.value = data.id
        editMode.value = true
        showUpsertModal.value = true
    }

    const closeModal = () => {
        title.value = ""
        source.value = ""
        selectedType.value = null
        selectedId.value = ""
        showUpsertModal.value = false
        showVideoModal.value = false
        showEbookModal.value = false
        showArticleModal.value = false
        editMode.value = false
    }

    const saveMedia = async () => {
        const result = editMode.value ? await useSaveMedia(
            selectedId.value,
            title.value, 
            source.value, 
            selectedType.value ?? MediaType.ARTICLE
        ) : await useAddMedia(
            title.value,
            source.value,
            selectedType.value ?? MediaType.ARTICLE
        )
        if (isLeft(result)) {
            alert(unwrapEither(result))
        }
        closeModal()
    }

    const deleteMedia = async (data: Media) => {
        const result = await useDeleteMedia(data.id, data.type)
        if (isLeft(result)) {
            alert(unwrapEither(result))
        } else {
            alert("Data berhasil dihapus")
        }
    }

    const openVideoModal = (data: string) => {
        source.value = data
        showVideoModal.value = true
    }

    useEventListener("keyup", (event: Event) => {
        console.log(event)
        if ((event as KeyboardEvent).code == "Escape") {
            closeModal()
        }
    })
</script>