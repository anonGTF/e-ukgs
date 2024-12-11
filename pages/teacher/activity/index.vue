<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Daftar Kegiatan UKGS {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <Text :typography="Typography.H2">Daftar Kegiatan Aktif</Text>
                <Button class="hidden sm:block" to="/teacher/activity/add">
                    Tambah Kegiatan
                </Button>
                <div 
                    class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white"
                    @click="navigateTo('teacher/activity/add')"
                >
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
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
                    <td class="flex justify-end gap-2">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            :to="`/teacher/activity/${data.activity.id}`"
                        >
                            Detail
                        </Button>
                        <template v-if="data.activity.status == ActivityStatus.TODO">
                            <Button
                                dense
                                :to="`/teacher/activity/${data.activity.id}/budget`"
                            >
                                Buat RAB
                            </Button>
                        </template>
                        <template v-if="data.activity.status == ActivityStatus.READY">
                            <Button
                                dense
                                @click="startActivity(data.activity)"
                            >
                                Mulai
                            </Button>
                        </template>
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
                    <td class="flex justify-end gap-2">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            :to="`/teacher/activity/${data.activity.id}`"
                        >
                            Detail
                        </Button>
                        <template v-if="data.activity.status == ActivityStatus.TODO">
                            <Button
                                dense
                                :to="`/teacher/activity/${data.activity.id}/budget`"
                            >
                                Buat RAB
                            </Button>
                        </template>
                        <template v-if="data.activity.status == ActivityStatus.READY">
                            <Button
                                dense
                                @click="startActivity(data.activity)"
                            >
                                Mulai
                            </Button>
                        </template>
                    </td>
                </tr>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const userStore = useUserStore()
    const uiStore = useUiStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kelola Kegiatan UKGS",
            route: "/teacher/activity"
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

    const activities = useGetAllActivitiesBySchoolId(userStore.school?.id ?? "")
    const users = useGetAllUsers()
    const tableData = computed(() => activities.value.map((activity) => ({
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

    const startActivity = (activity: Activity) => {
        uiStore.confirm(
            "Anda yakin ingin memulai kegiatan?",
            `Kegiatan ${activity.title} akan dimulai. Tidak bisa membatalkan kegiatan yang sudah dimulai`,
            ConfirmationType.INFO,
            async () => {
                uiStore.hideConfirmationModal()
                const updateResult = await useAddStartData(userStore.school?.id ?? "", activity.id, {
                    id: UPDATE_CONSTANTS.startDataAttr,
                    plannedStartTime: activity.startTime,
                    actualStartTime: new Date() 
                })

                if (isLeft(updateResult)) {
                    uiStore.showToast(unwrapEither(updateResult), ToastType.ERROR)
                    return
                }
                await useUpdateActivityStatus(userStore.school?.id ?? "", activity.id, ActivityStatus.ONPROGRESS)
            },
            () => {
                uiStore.hideConfirmationModal()
            }
        )
    }
</script>