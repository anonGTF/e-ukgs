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
        labels: props.labels.map((label) => label.split(' ')),
        datasets: [{
            label: props.dataLabel,
            backgroundColor: props.backgroundColors,
            data: props.data
        }]
    } as ChartData<"bar">))

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: false
                },
            },
            y: { 
                beginAtZero: true,
                ticks: {
                    stepSize: 0.5
                }
            }
        },
    }
</script>