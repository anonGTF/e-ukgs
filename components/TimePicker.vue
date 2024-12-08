<template>
    <VDatePicker 
        v-model="model" 
        locale="id-ID"
        mode="time" 
        :rules="rules"
        hide-time-header
        is24hr
        timezone="Asia/Jakarta"
    >
        <template #default="{ togglePopover }">
            <ReadOnlyTextField
                :label="label"
                :text="formatedTime.value"
                leading-icon="mdi:clock"
                clickable
                @click="togglePopover"
            />
        </template>
    </VDatePicker>
</template>

<script setup lang="ts">
    const rules = ref({
        minutes: [0, 15, 30, 45]
    })
    const props = defineProps({
        label: {
            type: String,
            default: ""
        },
        timeFormat: {
            type: String,
            default: "HH:mm"
        }
    })
    const model = defineModel({
        type: Date,
        default: new Date()
    })
    const formatedTime = computed(() => useDateFormat(model.value, props.timeFormat, { locales: "id-ID" }) ?? "")
</script>