<template>
    <div 
        :class="`cursor-pointer rounded-lg flex items-center justify-center ${getActiveClass()} ${getPadding()}`"
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
        dense: {
            type: Boolean,
            default: false
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

    const getPadding = () => {
        if (props.dense) {
            return "p-3"
        } else {
            return "p-4"
        }
    }

    const getIconBackground = () => props.selected ? "text-white" : "text-black"
</script>