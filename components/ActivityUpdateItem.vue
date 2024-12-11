<template>
    <div class="w-full flex flex-row gap-4">
        <div class="flex flex-col items-center">
            <div>
                <Text
                    class="rounded-full w-12 h-12 flex items-center justify-center font-bold"
                    :class="showDecoration ? 'border-border-primary border' : 'border-primary border-4'"
                >{{ orderNo }}</Text>
            </div>
            <div v-if="showDecoration" class="h-full bg-primary w-1"/>
        </div>
        <div class="flex-1">
            <template v-if="updateData.budgetPlan != null">
                <div class="min-h-12 flex flex-row gap-2 items-center justify-between">
                    <div>
                        <Text class="font-semibold" color="text-content-secondary">{{ formattedDate }}</Text>
                        <Text :typography="Typography.Label" class="font-bold" color="text-black">{{ formattedTime }} WIB</Text>
                    </div>
                    <ActivityStatusCard :status="ActivityStatus.READY"/>
                </div>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Rencana Anggaran Biaya</Text>
                <Spacer class="h-0.5"/>
                <Text v-if="updateData.budgetPlan.items.length == 0" :typography="Typography.Label" class="font-medium" color="text-black">
                    Kegiatan ini tidak membutuhkan dana.
                </Text>
                <DataTable v-else :headers="tableHeader">
                    <tr v-for="(data, index) in updateData.budgetPlan.items">
                        <th>
                            <Text :typography="Typography.Body2" class="text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.unit }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.count }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">Rp{{ formatPrice(data.pricePerUnit) }}</Text>
                        </td>
                        <td>
                            <Text class="font-semibold">Rp{{ formatPrice(data.subtotal) }}</Text>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <Text :typography="Typography.Label" color="text-black" class="text-end font-semibold">TOTAL</Text>
                        </td>
                        <td colspan="2">
                            <Text :typography="Typography.Label" color="text-black" class="font-semibold">Rp{{ formatPrice(getTotalBudget(updateData.budgetPlan)) }}</Text>
                        </td>
                    </tr>
                </DataTable>
                <Spacer height="h-8"/>
            </template>
            <template v-if="updateData.startData != null">
                <div class="min-h-12 flex flex-row gap-2 items-center justify-between">
                    <div>
                        <Text class="font-semibold" color="text-content-secondary">{{ formattedDate }}</Text>
                        <Text :typography="Typography.Label" class="font-bold" color="text-black">{{ formattedTime }} WIB</Text>
                    </div>
                    <ActivityStatusCard :status="ActivityStatus.ONPROGRESS"/>
                </div>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Rencana Waktu Mulai</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ formatDate(updateData.startData.plannedStartTime) }}</Text>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Waktu Mulai Aktual</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ formatDate(updateData.startData.actualStartTime) }}</Text>
                <Spacer height="h-8"/>
            </template>
            <template v-if="updateData.completionData != null">
                <div class="min-h-12 flex flex-row gap-2 items-center justify-between">
                    <div>
                        <Text class="font-semibold" color="text-content-secondary">{{ formattedDate }}</Text>
                        <Text :typography="Typography.Label" class="font-bold" color="text-black">{{ formattedTime }} WIB</Text>
                    </div>
                    <ActivityStatusCard :status="updateData.completionData.isDone ? ActivityStatus.DONE : ActivityStatus.DROPPED"/>
                </div>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Kendala</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ updateData.completionData.blocker }}</Text>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Detail Kegiatan</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ updateData.completionData.description }}</Text>
                <template v-if="updateData.completionData.evidences">
                    <Spacer height="h-4"/>
                    <Text>Foto Kegiatan</Text>
                    <Spacer height="h-2"/>
                    <div v-for="evidence in updateData.completionData.evidences" class="flex flex-row gap-2 flex-wrap">
                        <img :src="evidence"/>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useDateFormat } from '@vueuse/core';
    import type { PropType } from 'vue';
    import { Typography } from './attr/TextAttr';
    import type { UpdateItem } from './attr/ActivityUpdateItemAttr';

    const props = defineProps({
        orderNo: {
            type: Number,
            required: true
        },
        updateData: {
            type: Object as PropType<UpdateItem>,
            required: true
        },
        showDecoration: {
            type: Boolean,
            default: true
        }
    })

    const formattedDate = useDateFormat(props.updateData.updateTime, 'dddd, DD MMM YYYY', { locales: 'id-ID' })
    const formattedTime = useDateFormat(props.updateData.updateTime, 'HH:mm', { locales: 'id-ID' })

    const formatDate = (date: Date, format: string = "HH:mm, DD MMM YYYY"): string => useDateFormat(date, format, { locales: 'id-ID' }).value

    const tableHeader = ref([
        "",
        "Nama Alat/Bahan",
        "Satuan",
        "Jumlah",
        "Harga Satuan (Rp)",
        "Subtotal (Rp)",
    ])

    const getTotalBudget = (data: BudgetPlan) => data.items.reduce(((acc, curr) => acc + curr.subtotal), 0)
</script>