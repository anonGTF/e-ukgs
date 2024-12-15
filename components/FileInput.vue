<template>
    <Text :typography="Typography.Body2">{{ label }}</Text>
    <Spacer height="h-1" />
    <div class="flex flex-row gap-2 items-center">
        <Button 
            :type="ButtonType.Secondary"
            @click="selectFile"
        >
            {{ buttonText }}
        </Button>
        <Text :typography="Typography.Body1" class="truncate">{{ selectedFileName }}</Text>
    </div>
    <input 
        ref="file-input"
        type="file" 
        class="hidden" 
        :accept="fileType"
        :multiple="multiple"
        @change="handleChanged"
    />
</template>

<script setup lang="ts">
    const props = defineProps({
        label: {
            type: String,
            default: "Pilih file"
        },
        buttonText: {
            type: String,
            default: "Pilih file"
        },
        fileType: {
            type: String,
            default: ".pdf"
        },
        multiple: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits<{
        change: [file: File | null | undefined],
        multipleChange: [files: File[]]
    }>()

    const fileInput = useTemplateRef("file-input")

    const selectedFileName = ref("")

    const selectFile = () => { fileInput.value?.click() }

    const handleChanged = async (e: Event) => {
        const payload = e.target as HTMLInputElement

        if (props.multiple) {
            if (payload.files == null) return
            const files = Array.from(payload.files)
            selectedFileName.value = files.map((file) => file.name).reduce((acc, curr) => acc + ", " + curr, "")
            emit("multipleChange", files)
        } else {
            const file = payload.files?.item(0)
            selectedFileName.value = file?.name ?? ""
            emit("change", file)
        }
    }
</script>