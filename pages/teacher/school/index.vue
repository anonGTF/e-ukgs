<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Profil Sekolah dan Daftar Siswa {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Identitas Sekolah</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/teacher/school/edit`)"
                >
                    Edit Data Sekolah
                </Button>
                <div class="btn btn-square md:hidden" @click="navigateTo(`/admin/teacher/${route.params.id}/edit`)">
                    <Icon name="mdi:pencil" size="24px"/>
                </div>
            </div>
            <template v-for="detail in details" :key="detail.label">
                <Spacer class="h-6"/>
                <Text :typography="Typography.Body1">{{ detail.label }}</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ detail.data }}</Text>
            </template>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari siswa dgn nama' : 'Cari siswa berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Button class="hidden sm:block" to="/teacher/school/add">
                    Tambah Siswa
                </Button>
                <div 
                    class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white"
                    @click="navigateTo('teacher/school/add')"
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
                        <Text :typography="Typography.Body2">{{ data.name }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.grade }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.gender }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            :to="`/teacher/school/${data.id}`"
                        >
                            Detail
                        </Button>
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

    const route = useRoute()
    const uiStore = useUiStore()
    const userStore = useUserStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kelola Sekolah",
            route: "/teacher/school"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama",
        "Kelas",
        "Jenis Kelamin",
        ""
    ])

    const details = computed(() => [
        {
            label: "Nama Sekolah",
            data: userStore.school?.name
        },
        {
            label: "Alamat Sekolah",
            data: userStore.school?.address
        },
        {
            label: "Total Siswa",
            data: tableData.value.length
        }
    ])

    const tableData = useGetAllStudents(userStore.school?.id ?? "")
    const activeBreakpoint = ref("")
    const searchQuery = ref("")
    const filteredTableData = computed(() => tableData.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })
</script>