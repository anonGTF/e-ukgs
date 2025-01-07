<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Buat Rencana Anggaran Biaya</Text>
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
            <Spacer class="h-4"/>
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
        <Spacer height="h-6"/>
        <Button 
            full-width
            @click="save"
        >
            Simpan
        </Button>
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
            label: "Detail Kegiatan",
            route: `/teacher/activity/${route.params.id}`
        },
        {
            label: "Rencana Anggaran Biaya",
            route: `/teacher/activity/${route.params.id}/budget`
        }
    ])

    const activity = ref<Activity | null>(null)
    const pic = ref<User | null>(null)
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

    const save = async () => {
        const result = await useAddBudgetPlan(
            userStore.school?.id ?? "", 
            route.params.id as string,
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

        const activityUpdateResult = await useUpdateActivityStatus(userStore.school?.id ?? "", route.params.id as string, ActivityStatus.READY)

        if (isLeft(activityUpdateResult)) {
            uiStore.showToast(unwrapEither(activityUpdateResult), ToastType.ERROR)
            router.back()
            return
        }

        uiStore.showToast("RAB Berhasil dibuat", ToastType.SUCCESS)
        router.back()
        return
    }

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
</script>