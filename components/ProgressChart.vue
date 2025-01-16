<template>
    <div class="border border-border-primary rounded-lg p-4">
        <Text class="text-center font-semibold" color="text-black" :typography="Typography.Label">{{ title }}</Text>
        <Spacer height="h-6"/>
        <div class="flex items-center justify-center">
            <svg class="-rotate-90 -mt-6" width="120px" height="120px" xmlns="http://www.w3.org/2000/svg">
                <circle class="progress-circle-negative" :style="negativeStyle" cx="48" cy="48" r="43"></circle>
                <circle class="progress-circle-positive" :style="positiveStyle" cx="48" cy="48" r="43"></circle>
            </svg>
            <div>
                <div class="flex items-center gap-3">
                    <div class="rounded-full w-3 h-3 bg-content-success"></div>
                    <div>
                        <Text class="font-semibold">{{ props.positive }}</Text>
                        <Text :typography="Typography.Body3">{{ positiveLabel }}</Text>
                    </div>
                </div>
                <Spacer height="h-4"/>
                <div class="flex items-center gap-3">
                    <div class="rounded-full w-3 h-3 bg-content-error"></div>
                    <div>
                        <Text class="font-semibold">{{ props.negative }}</Text>
                        <Text :typography="Typography.Body3">{{ negativeLabel }}</Text>
                    </div>
                </div>
            </div>
        </div>
        <Spacer height="h-6"/>
        <Text class="text-center" :typography="Typography.Body2">{{ description }}</Text>
        <Spacer height="h-2"/>
        <Text class="text-center font-semibold" color="text-black" :typography="Typography.Label">{{ percentage.toFixed() }}%</Text>
    </div>
</template>
  
<script setup lang="ts">
    const props = defineProps({
        positive: {
            type: Number,
            default: 0
        },
        negative: {
            type: Number,
            default: 0
        },
        positiveLabel: {
            type: String,
            default: ""
        },
        negativeLabel: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    })
  
    const positiveDashArray = computed(() => Math.ceil(props.positive / (props.positive + props.negative) * 257))
    const negativeDastArray = computed(() => 240 - positiveDashArray.value)
    const negativeDashOffset = computed(() => positiveDashArray.value * (-1) - 15)
  
    const positiveStyle = computed(() => ({
        'stroke-dasharray': `${positiveDashArray.value} 999`
    }))
    const negativeStyle = computed(() => ({
        'stroke-dasharray': `${negativeDastArray.value} 999`,
        'stroke-dashoffset': `${negativeDashOffset.value}`
    }))

    const percentage = computed(() => props.positive / (props.positive + props.negative) * 100)
</script>

<style>
    .progress-circle-negative {
        fill: none; 
        stroke: #EE3D30;
        stroke-width: 10px;
        stroke-linecap: round;
        transition: stroke-dasharray 0.7s linear 0s;
    }
  
    .progress-circle-positive {
        fill: none; 
        stroke: #2DC653;
        stroke-width: 10px;  
        stroke-linecap: round;   
        stroke-dashoffset: 0;
        transition: stroke-dasharray 0.7s linear 0s;
    }
</style>