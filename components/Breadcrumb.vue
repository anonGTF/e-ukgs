<template>
    <div class="flex flex-row gap-2 items-center">
        <template v-for="(item, index) in items" :key="item.label">
            <NuxtLink :to="item.route">
                <Text 
                    :typography="Typography.Label"
                    class="font-semibold"
                    :class="index == lastIndex ? 'text-primary' : ''"
                >
                    {{ item.label.toUpperCase() }}
                </Text>
            </NuxtLink>
            <Text 
                v-if="index != lastIndex"
                :typography="Typography.Label" 
                class="font-semibold"
            >
                /
            </Text>
        </template>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        items: {
            type: Object as PropType<BreadcrumbArgs[]>,
            default: null
        }
    })

    const lastIndex = computed(() => props.items.length - 1)
</script>