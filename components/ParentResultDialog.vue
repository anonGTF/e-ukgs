<template>
    <dialog 
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': show }"
    >
        <div class="modal-box">
            <div class="flex flex-row items-center gap-2">
                <Icon 
                    name="mdi:check-decagram" 
                    size="2rem" 
                    class="text-success"
                />
                <Text :typography="Typography.H2">Jawaban Anda Sudah Disimpan!</Text>
            </div>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Dari jawaban yang Anda pilih, Anda mendapat nilai sebagai berikut:</Text>
            <Spacer height="h-4"/>
            <div class="flex flex-row gap-2 items-center justify-center">
                <Text :typography="Typography.Label" class="font-semibold" color="text-black">{{ roundScore(score) }}</Text>
                <ScoreStatusCard
                    :value="score"
                    :rules="parentScoreRule"
                />
            </div>
            <Spacer height="h-6"/>
            <Button
                full-width
                @click="$emit('dismiss')"
            >
                Oke, kembali ke beranda
            </Button>
        </div>
    </dialog>
</template>

<script setup lang="ts">

    const show = defineModel({ type: Boolean })

    defineProps({
        score: {
            type: Number,
            required: true
        }
    })

    defineEmits(['dismiss'])
</script>