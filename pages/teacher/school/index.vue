<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Kelompok {{ groupData?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari siswa dgn nama' : 'Cari siswa berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Button class="hidden sm:block" :to="`/admin/group/${route.params.id}/add-student`">
                    Tambah Siswa
                </Button>
                <div class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white">
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
                        <Text :typography="Typography.Body2">{{ "" }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.gender }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/group/${route.params.id}/${data.id}`)"
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
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';
    import { ToastType } from '~/components/attr/ToastAttr';
    import type { School } from '~/models/school/School';

    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()

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
        "ID Akun",
        "Jenis Kelamin",
        ""
    ])

    const tableData = useGetAllStudents(route.params.id as string)
    const activeBreakpoint = ref("")
    const searchQuery = ref("")
    const groupData = ref<School | null>(null)
    const uiStore = useUiStore()
    const userStore = useUserStore()

    const filteredTableData = computed(() => tableData.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    onMounted(async () => {
        const result = await useGetSchoolById(userStore.school?.id ?? "")
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            groupData.value = unwrapEither(result)
        }
    })

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })
</script>