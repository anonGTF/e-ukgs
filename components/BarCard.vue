<template>
    <div 
        :class="`${maxHeight}`"
        class="rounded-xl border border-border-primary px-4 pt-4 py-12"
    >   
        <Text class="text-center font-semibold" color="text-black" :typography="Typography.Label">{{ title }}</Text>
        <Spacer height="h-4"/>
        <BarChart
            :labels="labels"
            :data-label="dataLabel"
            :background-colors="backgroundColors"
            :data="data"
        />
    </div>
</template>

<script setup lang="ts">

    defineProps({
        title: {
            type: String,
            default: ""
        },
        maxHeight: {
            type: String,
            default: "h-100"
        },
        labels: {
            type: Array<String>,
            default: []
        },
        dataLabel: {
            type: String,
            default: ""
        },
        backgroundColors: {
            type: Array<String>,
            default: []
        },
        data: {
            type: Array<number>,
            default: []
        }
    })
</script>