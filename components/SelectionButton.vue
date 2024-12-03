<template>
    <div 
        class="cursor-pointer rounded-lg p-4 flex items-center justify-center"
        :class="getActiveClass()"
        @click="$emit('select')"
    >
        <Icon 
            :name="selected && selectedIcon != '' ? selectedIcon : icon"
            :class="getIconBackground()"
        />
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        icon: {
            type: String,
            default: ""
        },
        selectedIcon: {
            type: String,
            default: ""
        },
        selected: {
            type: Boolean,
            default: false
        }
    })

    defineEmits(['select'])

    const getActiveClass = () => {
        if (props.selected) {
            return "bg-primary"
        } else {
            return "hover:bg-gray-200"
        }
    }

    const getIconBackground = () => props.selected ? "text-white" : "text-black"
</script>