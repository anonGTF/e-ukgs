<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th v-for="header in headers">
                        <Text :typography="Typography.Body2" class="font-semibold">{{ header }}</Text>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isEmpty">
                    <tr>
                        <td :colspan="headers.length">
                            <div class="flex flex-col justify-center items-center py-2 gap-1">
                                <Icon name="mdi:package-variant" class="text-content-secondary" size="5rem"/>
                                <Text :typography="Typography.Body1" class="text-content-secondary font-medium">Tidak ada data</Text>
                            </div>
                        </td>
                    </tr>
                </template>
                <slot else />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        headers: {
            type: Array<String>,
            default: []
        },
        isEmpty: {
            type: Boolean,
            default: false
        }
    })

</script>