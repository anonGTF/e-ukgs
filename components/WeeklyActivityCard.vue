<template>
    <div class="col-span-7 grid grid-cols-7">
        <div 
            class="bg-background-blue-light rounded-xl flex flex-row gap-2 cursor-pointer hover:bg-background-secondary"
            :style="{
                'grid-column-start': getColStart(),
                'grid-column-end': getColEnd()
            }"
            @click="navigateTo(`/teacher/activity/${activity.id}`)"
        >
            <div class="bg-red-500 w-2 h-full rounded-s-xl" />
            <Text :typography="Typography.Label" color="text-black" class="my-4 font-semibold">{{ activity.title }}</Text>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue';

    const props = defineProps({
        activity: {
            type: Object as PropType<Activity>,
            required: true
        },
        weekDates: {
            type: Array<Date>,
            required: true
        }
    })

    const getColStart = () => {
        const index = props.weekDates.findIndex((date) =>
            date.getDate() == props.activity.startTime.getDate() &&
            date.getMonth() == props.activity.startTime.getMonth() &&
            date.getFullYear() == props.activity.startTime.getFullYear()
        )

        return index != -1 ? index + 1 : 1
    }
    const getColEnd = () => {
        const index = props.weekDates.findIndex(
        (date) =>
            date.getDate() == props.activity.endTime.getDate() &&
            date.getMonth() == props.activity.endTime.getMonth() &&
            date.getFullYear() == props.activity.endTime.getFullYear()
        )

        return index != -1 ? index + 2 : 1
    }
</script>