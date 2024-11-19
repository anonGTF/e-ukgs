<template>
    <div>
        {{ marked.parse(markdownContent) }}
    </div>
</template>

<script setup lang="ts">
    import { marked } from 'marked'

    const props = defineProps({
        source: {
            type: String,
            default: ""
        }
    })

    const markdownContent = ref("")

    onMounted(async () => {
        try {
            const response = await fetch(props.source)
            const text = await response.text()
            markdownContent.value = text
            console.log(text)
        } catch (error) {
            console.error('Failed to load content:', error)
        }
    })
</script>