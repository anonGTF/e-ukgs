<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Buat Kegiatan UKGS</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <CustomDropdownSelector
                :selected="wrapWithDropdownOption(selectedType)"
                label="Tipe Kegiatan"
                placeholder="Pilih tipe kegiatan"
                :options="typeOptions"
                @change="data => selectedType = data.data"
                class="w-full"
            />
            <Spacer height="h-4"/>
            <template v-if="selectedType == ActivityType.OTHER">
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
    import { ACTIVITY_TYPE_LABEL, ActivityStatus, ActivityType, type Activity } from '~/models/activity/Activity';

    definePageMeta({
        layout: 'teacher'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Manajemen Kegiatan UKGS",
            route: "/teacher/activity"
        },
        {
            label: "Buat Kegiatan UKGS",
            route: "/teacher/activity/add"
        }
    ])

    const typeOptions = ref<CustomDropdownOption<ActivityType>[]>([
        {
            label: ACTIVITY_TYPE_LABEL.studentForm,
            data: ActivityType.STUDENT_FORM
        },
        {
            label: ACTIVITY_TYPE_LABEL.parentForm,
            data: ActivityType.PARENT_FORM
        },
        {
            label: ACTIVITY_TYPE_LABEL.toothHealthCheck,
            data: ActivityType.TOOTH_HEALTH
        },
        {
            label: ACTIVITY_TYPE_LABEL.evaluation,
            data: ActivityType.EVALUATION
        },
        {
            label: ACTIVITY_TYPE_LABEL.other,
            data: ActivityType.OTHER
        }
    ])
    const selectedType = ref<ActivityType | null>(null)
    const wrapWithDropdownOption = (data: ActivityType | null) => typeOptions.value.find((option) => option.data == data)
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
        const selectedTypeOption = typeOptions.value.find((option) => option.data == selectedType.value)
        const result = await useAddActivity(userStore.school?.id ?? "", {
            id: "",
            startTime: startDateTime.value,
            endTime: endDateTime.value,
            status: ActivityStatus.TODO,
            place: place.value,
            picId: userStore.user?.id ?? "",
            title: selectedTypeOption?.data == ActivityType.OTHER ? customTitle.value : (selectedTypeOption?.label ?? ""),
            type: selectedType.value ?? ActivityType.OTHER
        } satisfies Activity)

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            uiStore.showToast("Berhasil menambahkan kegiatan", ToastType.SUCCESS)
            router.go(-1)
        }
    }
</script>