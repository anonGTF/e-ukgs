<template>
    <NuxtLink :to="menu.route" @click="$emit('click')">
        <span class="flex flex-row gap-2 items-center">
            <span 
                class="w-0.5 h-9"
                :class="isActive ? 'bg-primary' : 'bg-transparent'"
            ></span>
            <Icon :name="(isActive && menu.selectedIcon != null ? menu.selectedIcon : menu.icon) ?? ''"/>
        </span>
        <Text 
            :typography="Typography.Body1" 
            :color="isActive ? 'text-text-content-primary' : 'text-content-secondary'"
            :class="isActive ? 'font-semibold' : ''"
        >
            {{ menu.label }}
        </Text>
    </NuxtLink>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue';

    const props = defineProps({
        menu: {
            type: Object as PropType<MenuItemArgs>,
            default: null
        }
    })

    defineEmits(['click'])

    const route = useRoute()

    const isActive = computed(() => route.path.startsWith(props.menu.route ?? ''))
</script>