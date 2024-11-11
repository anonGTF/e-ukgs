<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Guru</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari guru dgn nama' : 'Cari guru berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Button class="hidden sm:block" to="/admin/teacher/add">
                    Tambah Guru
                </Button>
                <div class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white">
                    <Icon name="mdi:plus" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th v-for="header in tableHeader">
                                <Text :typography="Typography.Body2" class="font-semibold">{{ header }}</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in filteredTableData">
                            <th>
                                <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                            </th>
                            <td>
                                <Text :typography="Typography.Body2">{{ data.name }}</Text>
                            </td>
                            <td>
                                <Text :typography="Typography.Body2">{{ data.id }}</Text>
                            </td>
                            <td>
                                <Text :typography="Typography.Body2">{{ data.gender }}</Text>
                            </td>
                            <td class="flex justify-end">
                                <Button :type="ButtonType.Outlined">
                                    Detail
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/Breadcrumb';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Akun Guru",
            route: "/admin/teacher"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama",
        "ID Akun",
        "Jenis Kelamin",
        ""
    ])

    const tableData = useGetAllTeachers()
    const activeBreakpoint = ref("")
    const searchQuery = ref("")

    const filteredTableData = computed(() => tableData.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    onMounted(async () => {
        window.addEventListener("resize",() => {
            activeBreakpoint.value = getActiveBreakpoint()
        })
    })
</script>