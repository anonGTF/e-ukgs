<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1">Pilih Sekolah</Text>
        <Spacer height="h-2"/>
        <Text :typography="Typography.Body2">Pilih sekolah untuk lihat detail kegiatan pada sekolah tersebut</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <TextField
                v-model="searchQuery"
                placeholder="Cari nama sekolah"
                leading-icon="mdi:magnify"
                class="me-1 w-52 sm:w-[16.7rem]"
            />
            <Spacer class="h-6"/>
            <DataTable
                :headers="tableHeader"
                :is-empty="filteredTableData.length == 0"
            >
                <tr v-for="(data, index) in filteredTableData">
                    <td>
                        <div class="flex flex-row gap-2">
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}.</Text>
                            <Text :typography="Typography.Body2">{{ data.name }}</Text>
                        </div>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/ukgs/${data.id}`)"
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
            label: "Data Kegiatan UKGS",
            route: "/admin/ukgs"
        }
    ])

    const tableHeader = ref([
        "",
        ""
    ])

    const schools = useGetAllSchools()
    const searchQuery = ref("")
    const filteredTableData = computed(() => schools.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase())))
</script>