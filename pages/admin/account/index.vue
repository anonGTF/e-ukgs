<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Daftar Akun</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari akun dgn nama' : 'Cari akun berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Button class="hidden sm:block" to="/admin/account/add">
                    Tambah Akun
                </Button>
                <NuxtLink to="/admin/account/add" class="flex sm:hidden justify-center">
                    <div class="drawer-button btn btn-square bg-primary text-white">
                        <Icon name="mdi:plus" size="24px"/>
                    </div>
                </NuxtLink>
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
                        <Text :typography="Typography.Body2">{{ data.user.name }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.user.userId }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.user.gender }}</Text>
                    </td>
                    <td>
                        <RoleStatusCard :role="data.user.role"/>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.school?.name ?? data.user.instansi }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/account/${data.user.id}`)"
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
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Akun",
            route: "/admin/account"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama",
        "ID Akun",
        "Jenis Kelamin",
        "Tugas",
        "Instansi",
        ""
    ])

    const users = useGetAllUsers()
    const schools = useGetAllSchools()
    const activeBreakpoint = ref("")
    const searchQuery = ref("")
    const tableData = computed(() => users.value.map((user) => ({
        user,
        school: schools.value.find((school) => school.id == user.schoolId)
    })))
    const filteredTableData = computed(() => tableData.value.filter((data) => data.user.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })
</script>