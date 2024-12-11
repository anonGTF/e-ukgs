<template>
    <div class="px-4 py-2 rounded-lg mb-2 w-fit" :class="statusBg">
        <Text :typography="Typography.Body2" class="font-semibold" color="text-white">{{ statusMessage }}</Text>
    </div>
</template>

<script setup lang="ts">
    import { Typography } from './attr/TextAttr';

    const props = defineProps({
        status: {
            type: Number,
            default: 0
        }
    })

    const statusMessage = computed(() => {
        switch (props.status) {
            case ActivityStatus.TODO:
                return "Rencana"
            case ActivityStatus.READY:
                return "Siap Dimulai"
            case ActivityStatus.ONPROGRESS:
                return "Sedang Berjalan"
            case ActivityStatus.DONE:
                return "Selesai"
            case ActivityStatus.DROPPED:
                return "Dibatalkan"
        }
    })

    const statusBg = computed(() => {
        switch (props.status) {
            case ActivityStatus.TODO:
                return "bg-gray-400"
            case ActivityStatus.READY:
                return "bg-warning"
            case ActivityStatus.ONPROGRESS:
                return "bg-warning"
            case ActivityStatus.DONE:
                return "bg-success"
            case ActivityStatus.DROPPED:
                return "bg-error"
        }
    })
</script>