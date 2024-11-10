<template>
    <details :open="isActive">
        <summary>
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
        </summary>
        <ul>
            <li v-for="submenu in menu.subMenuItems" :key="submenu.label">
                <NuxtLink :to="submenu.route" @click="$emit('submenuClick')">
                    <div class="h-9 flex items-center">
                        <Text 
                            :typography="Typography.Body1" 
                            :color="submenu.route == route.path ? 'text-content-primary' : 'text-content-secondary'"
                            class="ps-9"
                            :class="submenu.route == route.path ? 'font-semibold' : ''"
                        >
                            {{ submenu.label }}
                        </Text>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </details>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue';
    import type { MenuItemArgs } from './attr/MenuItemAttr';
    import { Typography } from '~/components/attr/TextAttr'

    const props = defineProps({
        menu: {
            type: Object as PropType<MenuItemArgs>,
            default: null
        }
    })

    defineEmits(['submenuClick'])

    const route = useRoute()
    const isActive = computed(() => props.menu.subMenuItems?.some(subItem => subItem.route === route.path) || false)
</script>