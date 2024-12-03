<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Kelola Kuesioner</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <DataTable
                :headers="tableHeader"
                :is-empty="tableData.length == 0"
            >
                <tr v-for="(data, index) in tableData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.title }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            @click="navigateTo(`/admin/questionnarie/${data.id}`)"
                        >
                            Atur
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

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Kuesioner",
            route: "/admin/questionnaire"
        }
    ])

    const tableHeader = ref([
        "",
        "",
        ""
    ])

    const tableData = useGetAllQuestionnaire()
</script>