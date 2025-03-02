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
            <Spacer height="h-4"/>
            <CustomDropdownSelector
                :selected="wrapPicWithDropdownOption(selectedPic)"
                label="Penanggung Jawab"
                placeholder="Pilih penanggung jawab"
                :options="picOptions"
                @change="data => selectedPic = data.data"
                class="w-full"
            />
            <Spacer class="h-6"/>
            <Toggle
                v-model="isNeedBudget"
                label="Apakah kegiatan ini membutuhkan biaya?"
            />
        </div>
        <template v-if="isNeedBudget">
            <Spacer class="h-6"/>
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <DataTable :headers="tableHeader">
                    <tr v-for="(data, index) in budgetingItems">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <TextField 
                                v-model="data.name"
                                placeholder="Nama alat/bahan"
                            />
                        </td>
                        <td>
                            <TextField 
                                v-model="data.unit"
                                placeholder="Satuan"
                            />
                        </td>
                        <td>
                            <TextField 
                                v-model:number="data.count"
                                type="number"
                                placeholder="Jumlah"
                            />
                        </td>
                        <td>
                            <AmountTextField
                                v-model="data.pricePerUnit"
                                placeholder="Harga satuan (Rp)"
                            />
                        </td>
                        <td>
                            <Text class="font-semibold">Rp{{ formatPrice(data.subtotal) }}</Text>
                        </td>
                        <td class="flex justify-end gap-2">
                            <Button 
                                v-if="budgetingItems.length > 1"
                                :type="ButtonType.Primary" 
                                class="bg-error border-none hover:bg-error/75"
                                @click="deleteItem(index)"
                            >
                                <Icon name="mdi:trash-can" class="text-white"/>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <Text :typography="Typography.Label" color="text-black" class="text-end font-semibold">TOTAL</Text>
                        </td>
                        <td colspan="2">
                            <Text :typography="Typography.Label" color="text-black" class="font-semibold">Rp{{ formatPrice(budgetTotal) }}</Text>
                        </td>
                    </tr>
                </DataTable>
                <Spacer height="h-4"/>
                <Button 
                    full-width
                    :type="ButtonType.DashOutlined"
                    class="hover:bg-gray-200 hover:text-black hover:border-gray-200"
                    @click="addItem"
                >
                    <span class="flex flex-row items-center">
                        <Icon name="mdi:plus"/>
                        <Spacer width="w-2"/>
                        Tambah Item
                    </span>
                </Button>
            </div>
        </template>
        <Spacer height="h-6" />
        <Button 
            full-width
            :loading="isLoading"
            @click="create"
        >
            Buat Kegiatan
        </Button>
    </div>
</template>

<script setup lang="ts">
    import { ACTIVITY_TYPE_LABEL, ActivityStatus, ActivityType, type Activity } from '~/models/activity/Activity';

    definePageMeta({
        layout: 'teacher'
    })

    const uiStore = useUiStore()
    const userStore = useUserStore()
    const router = useRouter()

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
    const pic = asyncComputed(async () => {
        const result = await useGetAllUsersBySchoolId(userStore.school?.id ?? "")
        if (isLeft(result)) {
            return []
        } else {
            return unwrapEither(result) as User[]
        }
    })
    const picOptions = computed(() => pic.value?.map((user) => ({
        data: user,
        label: user.name
    } satisfies CustomDropdownOption<User>)) ?? [])
    const selectedPic = ref<User | null>(null)
    const wrapPicWithDropdownOption = (data: User | null) => picOptions.value?.find((option) => option.data == data)
    const isNeedBudget = ref(true)

    const tableHeader = ref([
        "",
        "Nama Alat/Bahan",
        "Satuan",
        "Jumlah",
        "Harga Satuan (Rp)",
        "Subtotal (Rp)",
        ""
    ])

    const budgetingItems = ref<Budget[]>([
        {
            name: "",
            unit: "",
            count: 0,
            pricePerUnit: 0,
            subtotal: 0
        }
    ])

    watch(
        budgetingItems,
        (items) => items.forEach((item) => item.subtotal = item.count * item.pricePerUnit),
        { deep: true }
    )

    const addItem = () => {
        budgetingItems.value.push({
            name: "",
            unit: "",
            count: 0,
            pricePerUnit: 0,
            subtotal: 0
        })
    }

    const deleteItem = (index: number) => {
        budgetingItems.value.splice(index, 1)
    }

    const budgetTotal = computed(() => budgetingItems.value.reduce(((acc, curr) => acc + curr.subtotal), 0))

    const isLoading = ref(false)

    const create = async () => {
        if (place.value == "" || selectedType.value == null || selectedPic.value == null) {
            uiStore.showToast("Isi semua data", ToastType.ERROR)
            return
        }

        isLoading.value = true
        const selectedTypeOption = typeOptions.value.find((option) => option.data == selectedType.value)
        const result = await useAddActivity(userStore.school?.id ?? "", {
            id: "",
            startTime: startDateTime.value,
            endTime: endDateTime.value,
            status: ActivityStatus.TODO,
            place: place.value,
            picId: selectedPic.value?.id ?? userStore.user?.id ?? "",
            title: selectedTypeOption?.data == ActivityType.OTHER ? customTitle.value : (selectedTypeOption?.label ?? ""),
            type: selectedType.value ?? ActivityType.OTHER,
            schoolId: null
        } satisfies Activity)

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            await saveBudgeting(unwrapEither(result))
        }
    }

    const saveBudgeting = async (activityId: string) => {
        const result = await useAddBudgetPlan(
            userStore.school?.id ?? "", 
            activityId,
            {
                id: UPDATE_CONSTANTS.budgetPlanAttr,
                items: isNeedBudget.value ? budgetingItems.value : [],
                total: isNeedBudget.value ? budgetTotal.value : 0
            }
        )

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
            return
        }

        const activityUpdateResult = await useUpdateActivityStatus(userStore.school?.id ?? "", activityId, ActivityStatus.READY)

        if (isLeft(activityUpdateResult)) {
            uiStore.showToast(unwrapEither(activityUpdateResult), ToastType.ERROR)
            router.back()
            return
        }

        uiStore.showToast("Berhasil menambahkan kegiatan", ToastType.SUCCESS)
        router.go(-1)
        return
    }
</script>