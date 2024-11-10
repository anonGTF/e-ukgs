<template>
  <NuxtLink :to="props.route">
    <component :is="props.icon" :class="colorStyle"/>
    <Text :color="colorStyle">{{ props.title }}</Text>
  </NuxtLink>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'ic-home'
    },
    route: {
      type: String,
      default: '/'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })

  const colorStyle = computed(() => props.isActive ? 'text-white' : 'text-white/[.5]')
</script>