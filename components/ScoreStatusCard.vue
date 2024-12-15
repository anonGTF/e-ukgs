<template>
    <div v-if="selectedRule" class="px-4 py-2 rounded-lg w-fit" :class="selectedRule.backgroundColor">
        <Text :typography="Typography.Body2" class="font-semibold" color="text-white">{{ selectedRule.label }}</Text>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue'

    const props = defineProps({
        value: {
            type: Number,
            required: true
        },
        rules: {
            type: Array as PropType<ScoreStatusRule[]>,
            default: () => []
        }
    })

    const selectedRule = computed(() => props.rules.find((rule) => props.value >= rule.min && props.value <= rule.max))
</script>