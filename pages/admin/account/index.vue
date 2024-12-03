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
                <NuxtLink to="/admin/teacher/add" class="flex sm:hidden justify-center">
                    <div class="drawer-button btn btn-square bg-primary text-white">
                        <Icon name="mdi:plus" size="24px"/>
                    </div>
                </NuxtLink>
            </div>
            <Spacer class="h-6"/>
            <!-- <DataTable
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
                        <Text :typography="Typography.Body2">{{ data.userId }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.gender }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/teacher/${data.id}`)"
                        >
                            Detail
                        </Button>
                    </td>
                </tr>
            </DataTable> -->
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
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
            label: "Kelola Akun",
            route: "/admin/account"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama",
        "ID Akun",
        "Jenis Kelamin",
        ""
    ])

    // const tableData = useGetAllAcc()
    const activeBreakpoint = ref("")
    const searchQuery = ref("")

    // const filteredTableData = computed(() => tableData.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })
</script>