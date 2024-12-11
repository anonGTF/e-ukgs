<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">{{ isDone ? 'Selesaikan' : 'Batalkan' }} Kegiatan UKGS</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.Body1">Nama Kegiatan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity?.title }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Waktu Pelaksanaan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity ? getActivityTimeFormatted(activity) : "" }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Penanggung Jawab</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ pic?.name }}</Text>
        </div>
        <Spacer height="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <TextField
                v-model="blocker"
                label="Kendala"
                placeholder="Masukkan kendala pada kegiatan"
            />
            <Spacer height="h-4"/>
            <TextArea
                v-model="description"
                :label="route.query.isDone ? 'Deskripsi Hasil Kegiatan' : 'Deskripsi Pembatalan'"
                :placeholder="route.query.isDone ? 'Masukkan deskripsi singkat hasil kegiatan yang dilaksanakan' : 'Masukkan alasan singkat pembatalan kegiatan'"
            />
            <Spacer height="h-6"/>
            <Button
                full-width
                @click="save"
            >
                Simpan
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

    const isDone = computed(() => route.query.isDone == 'true' || false)

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kelola Kegiatan UKGS",
            route: "/teacher/activity"
        },
        {
            label: "Detail",
            route: `/teacher/activity/${route.params.id}`
        },
        {
            label: `${ isDone.value ? "Selesaikan" : "Batalkan" }`,
            route: `/teacher/activity/${route.params.id}?isDone=${isDone.value}`
        }
    ])

    const activity = ref<Activity | null>(null)
    const pic = ref<User | null>(null)
    const blocker = ref("")
    const description = ref("")
    const isLoading= ref(false)

    onMounted(async () => {
        const result = await useGetActivityById(userStore.school?.id ?? "", route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
            return
        }
        activity.value = unwrapEither(result)
        
        const picResult = await useGetUserById(activity.value.picId)
        if (isLeft(picResult)) {
            uiStore.showToast(unwrapEither(picResult), ToastType.ERROR)
            router.back()
            return
        }
        pic.value = unwrapEither(picResult)
    })

    const save = async () => {
        isLoading.value = true
        const result = await useAddCompletionData(
            userStore.school?.id ?? "", 
            route.params.id as string,
            {
                id: UPDATE_CONSTANTS.completionDataAttr,
                isDone: isDone.value,
                blocker: blocker.value,
                description: description.value
            }
        )

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            isLoading.value = true
            return
        }

        const activityUpdateResult = await useUpdateActivityStatus(
            userStore.school?.id ?? "", 
            route.params.id as string, 
            isDone.value ? ActivityStatus.DONE : ActivityStatus.DROPPED
        )

        if (isLeft(activityUpdateResult)) {
            uiStore.showToast(unwrapEither(activityUpdateResult), ToastType.ERROR)
            isLoading.value = true
            return
        }

        uiStore.showToast("Kegiatan berhasil diselesaikan", ToastType.SUCCESS)
        router.back()
    }
</script>