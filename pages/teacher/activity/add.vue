<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Buat Kegiatan UKGS</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <DropdownSelector
                v-model="activityType"
                label="Tipe Kegiatan"
                placeholder="Pilih tipe kegiatan"
                :options="typeSelection"
            />
            <Spacer height="h-4"/>
            <template v-if="activityType == ACTIVITY_TYPE.other">
                <TextField
                    v-model="customTitle"
                    type="text"
                    placeholder="Masukkan judul kegiatan"
                    label="Judul Kegiatan"
                />
                <Spacer height="h-4"/>
            </template>
            <div class="flex flex-row flex-wrap gap-4 items-center">
                <DatePicker
                    v-model="startDateTime"
                    label="Tanggal Mulai"
                    class="flex-1"
                />
                <TimePicker
                    v-model="startDateTime"
                    label="Waktu Mulai"  
                    class="flex-1"
                />
            </div>
            <Spacer height="h-4"/>
            <div class="flex flex-row flex-wrap gap-4 items-center">
                <DatePicker
                    v-model="endDateTime"
                    label="Tanggal Selesai"
                    class="flex-1"
                />
                <TimePicker
                    v-model="endDateTime"
                    label="Waktu Selesai"  
                    class="flex-1"
                />
            </div>
            <Spacer height="h-4"/>
            <TextField
                v-model="place"
                type="text"
                placeholder="Masukkan tempat kegiatan UKGS"
                label="Tempat Kegiatan UKGS"
            />
            <Spacer height="h-12" />
            <Button 
                full-width
                :loading="isLoading"
                @click="create"
            >
                Buat Kegiatan
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ACTIVITY_TYPE, ActivityStatus, type Activity } from '~/models/activity/Activity';

    definePageMeta({
        layout: 'teacher'
    })

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
            label: "Buat Kegiatan UKGS",
            route: "/teacher/activity/add"
        }
    ])

    const typeSelection = [
        ACTIVITY_TYPE.studentForm,
        ACTIVITY_TYPE.parentForm,
        ACTIVITY_TYPE.toothHealthCheck,
        ACTIVITY_TYPE.evaluation,
        ACTIVITY_TYPE.other
    ]
    const activityType = ref("")
    const customTitle = ref("")
    const startDateTime = ref(new Date())
    const endDateTime = ref(new Date())
    const place = ref("")
    const isLoading = ref(false)
    const uiStore = useUiStore()
    const userStore = useUserStore()
    const router = useRouter()

    const create = async () => {
        isLoading.value = true
        const result = await useAddActivity(userStore.school?.id ?? "", {
            id: "",
            startTime: startDateTime.value,
            endTime: endDateTime.value,
            status: ActivityStatus.TODO,
            place: place.value,
            picId: userStore.user?.id ?? "",
            title: activityType.value == ACTIVITY_TYPE.other ? customTitle.value : activityType.value
        } satisfies Activity)

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            uiStore.showToast("Berhasil menambahkan kegiatan", ToastType.SUCCESS)
            router.go(-1)
        }
    }
</script>