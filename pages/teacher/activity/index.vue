<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Daftar Kegiatan UKGS {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari nama kegiatan' : 'Cari nama kegiatan'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
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
                :is-empty="filteredTableData.length == 0"
            >
                <tr v-for="(data, index) in filteredTableData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.activity.title }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ useDateFormat(data.activity.startTime, "DD MMM YYYY HH:mm", { locales: "id-ID" }) }} - {{ useDateFormat(data.activity.endTime, getEndTimeFormat(data.activity), { locales: "id-ID" }) }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.activity.status }}</Text>
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
                    </td>
                </tr>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useDateFormat } from '@vueuse/core';

    definePageMeta({
        layout: 'teacher'
    })

    const userStore = useUserStore()

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

    const activeBreakpoint = ref("")
    const searchQuery = ref("")
    const filteredTableData = computed(() => tableData.value.filter((data) => data.activity.title.toLowerCase().includes(searchQuery.value.toLowerCase())))
    const getEndTimeFormat = (activity: Activity): string => 
        (activity.startTime.getDate() == activity.endTime.getDate() && 
        activity.startTime.getMonth() == activity.endTime.getMonth() &&
        activity.startTime.getFullYear() == activity.endTime.getFullYear()) ? "HH:mm" : "DD MMM YYYY HH:mm"

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })
</script>