<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <div class="flex flex-row items-center justify-between pb-4 border-b border-border-divider">
            <Text :typography="Typography.H1">Daftar Kegiatan UKGS {{ schoolData?.name }}</Text>
        </div>
        <Spacer class="h-6"/>
        <template v-if="schoolData">
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Kegiatan Aktif</Text>
                <Spacer class="h-6"/>
                <DataTable
                    :headers="tableHeader"
                    :is-empty="activeTableData.length == 0"
                >
                    <tr v-for="(data, index) in activeTableData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.activity.title }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ getActivityTimeFormatted(data.activity) }}</Text>
                        </td>
                        <td>
                            <ActivityStatusCard :status="data.activity.status"/>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.pic?.name }}</Text>
                        </td>
                        <td>
                            <Button
                                dense
                                :type="ButtonType.Outlined"
                                :to="`/admin/ukgs/${schoolData.id}/${data.activity.id}`"
                            >
                                Lihat Detail
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </div>
            <Spacer class="h-6"/>
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Riwayat Kegiatan</Text>
                <Spacer class="h-6"/>
                <DataTable
                    :headers="tableHeader"
                    :is-empty="historyTableData.length == 0"
                >
                    <tr v-for="(data, index) in historyTableData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.activity.title }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ getActivityTimeFormatted(data.activity) }}</Text>
                        </td>
                        <td>
                            <ActivityStatusCard :status="data.activity.status"/>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.pic?.name }}</Text>
                        </td>
                        <td>
                            <Button
                                dense
                                :type="ButtonType.Outlined"
                                :to="`/admin/ukgs/${schoolData.id}/${data.activity.id}`"
                            >
                                Lihat Detail
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </div>
        </template>
        <template v-else>
            <div class="bg-white border border-border-primary rounded-2xl p-8 flex flex-col justify-center items-center">
                <Text>Memuat...</Text>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin'
    })

    const route = useRoute()
    const router = useRouter()
    const uiStore = useUiStore()
    const schoolData = ref<School | null>(null)

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Data Kegiatan UKGS",
            route: "/admin/ukgs"
        },
        {
            label: "Sekolah",
            route: `/admin/ukgs/${route.params.schoolId}`
        }
    ])

    const tableHeader = ref([
        "",
        "Judul Kegiatan",
        "Waktu Pelaksanaan",
        "Status Pelaksanaan",
        "Penanggung Jawab",
        ""
    ])

    const activities = computed(() => schoolData.value ? useGetAllActivitiesBySchoolId(schoolData.value?.id) : ref([]))
    const users = useGetAllUsers()
    const tableData = computed(() => activities.value.value.map((activity) => ({
        activity,
        pic: users.value.find((user) => user.id == activity.picId)
    })))

    const activeTableData = computed(() => tableData.value
        .filter(item => item.activity.status !== ActivityStatus.DONE && item.activity.status !== ActivityStatus.DROPPED)
        .sort((curr, next) => next.activity.startTime.getTime() - curr.activity.startTime.getTime())
    )

    const historyTableData = computed(() => tableData.value
        .filter(item => item.activity.status === ActivityStatus.DONE || item.activity.status === ActivityStatus.DROPPED)
        .sort((curr, next) => next.activity.startTime.getTime() - curr.activity.startTime.getTime())
    )

    onMounted(async () => {
        const result = await useGetSchoolById(route.params.schoolId as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            schoolData.value = unwrapEither(result)
        }
    })
</script>