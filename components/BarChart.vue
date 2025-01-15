<template>
    <Bar :data="constructedData" :options="options" />
</template>

<script setup lang="ts">
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        BarElement,
        CategoryScale,
        LinearScale,
        type ChartData
    } from 'chart.js'
    import { Bar } from 'vue-chartjs'

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

    const props = defineProps({
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

    const constructedData = computed(() => ({
        labels: props.labels,
        datasets: [{
            label: props.dataLabel,
            backgroundColor: props.backgroundColors,
            data: props.data
        }]
    } as ChartData<"bar">))

    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
            {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false
    }
</script>