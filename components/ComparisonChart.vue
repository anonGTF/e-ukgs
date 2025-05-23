<template>
    <Bar :data="constructedData" :options="options" />
</template>

<script setup lang="ts">
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
        type ChartData
    } from 'chart.js'
    import { Bar } from 'vue-chartjs'

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

    const props = defineProps({
        labels: {
            type: Array<String>,
            default: []
        },
        titles: {
            type: Array<String>,
            default: []
        },
        data: {
            type: Array<Array<number>>,
            default: []
        }
    })

    const constructedData = computed(() => ({
        labels: props.labels,
        datasets: props.data.map((d, index) => ({
            label: props.titles[index],
            backgroundColor: index == 0 ? "#2DC653" : "#405BE7",
            data: d
        }))
    } as ChartData<"bar">))

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            }
        },
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
                    stepSize: 5
                }
            }
        },
    }
</script>