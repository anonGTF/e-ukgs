<template>
    <div class="px-4 py-2 rounded-lg mb-2 w-fit" :class="roleBg">
        <Text :typography="Typography.Body2" class="font-semibold" color="text-white">{{ roleLabel }}</Text>
    </div>
</template>

<script setup lang="ts">
    import { Typography } from './attr/TextAttr';

    const props = defineProps({
        role: {
            type: String,
            required: true
        }
    })

    const roleLabel = computed(() => {
        switch (props.role) {
            case "admin":
                return "Petugas Puskesmas"
            case "teacher":
                return "Guru Pelaksana UKGS"
            default:
                return ""
        }
    })

    const roleBg = computed(() => {
        switch (props.role) {
            case "admin":
                return "bg-success"
            case "teacher":
                return "bg-info"
            default:
                return "bg-gray-400"
        }
    })
</script>