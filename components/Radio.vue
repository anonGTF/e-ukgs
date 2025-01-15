<template>
    <label class="label cursor-pointer flex flex-row justify-start gap-4">
        <input 
            type="radio" 
            :name="group"
            class="radio checked:bg-primary" 
            :value="value"
            :checked="selected.text == value.text" 
            :disabled="!enabled"
            @change="enabled ? $emit('change', value) : ''"
            style="opacity: 100%"
        />
        <Text>{{ value.text }}</Text>
  </label>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

    const props = defineProps({
        value: {
            type: Object as PropType<Answer>,
            default: ""
        },
        group: {
            type: String,
            default: ""
        },
        selected: {
            type: Object as PropType<Answer>,
            default: false
        },
        enabled: {
            type: Boolean,
            default: true
        }
    })

    defineEmits<{
        change: [data: Answer]
    }>()
</script>