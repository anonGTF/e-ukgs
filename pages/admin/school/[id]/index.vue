<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Sekolah</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Identitas Sekolah</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/admin/school/${route.params.id}/edit`)"
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
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Daftar Guru Pelaksana UKGS</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/admin/account/add`)"
                >
                    Tambah Tim Pelaksana UKGS
                </Button>
                <div class="btn btn-square md:hidden" @click="navigateTo(`/admin/account/add`)">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <DataTable
                v-if="teachers"
                :headers="teacherTableHeader"
                :is-empty="teachers.length == 0"
            >
                <tr v-for="(data, index) in teachers">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.name }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.userId }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.gender }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/account/${data.id}`)"
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
    const route = useRoute()

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Sekolah",
            route: "/admin/school"
        },
        {
            label: "Detail Sekolah",
            route: `/admin/school/${route.params.id}`
        }
    ])

    const schoolData = ref<School | null>(null)
    const studentData = useGetAllStudents(route.params.id as string)
    const details = computed(() => [
        {
            label: "Nama Sekolah",
            data: schoolData.value?.name
        },
        {
            label: "Alamat Sekolah",
            data: schoolData.value?.address
        },
        {
            label: "Total Siswa",
            data: studentData.value.length
        }
    ])
    const teacherTableHeader = ref([
        "",
        "Nama",
        "ID",
        "Jenis Kelamin",
        ""
    ])
    const teachers = asyncComputed(async () => {
        if (schoolData.value == undefined) return []

        const result = await useGetAllUsersBySchoolId(schoolData.value.id)
        if (isLeft(result)) {
            return []
        } else {
            return unwrapEither(result) as User[]
        }
    })
    const uiStore = useUiStore()

    onMounted(async () => {
        const result = await useGetSchoolById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            schoolData.value = unwrapEither(result) as School
        }
    })
</script>