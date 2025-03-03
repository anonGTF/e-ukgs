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
                <Text :typography="Typography.H2">Jawaban Kamu Udah Disimpan!</Text>
            </div>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Dari jawaban yang kamu pilih, kamu mendapat nilai sebagai berikut:</Text>
            <Spacer height="h-6"/>
            <DataTable
                :headers="tableHeader"
                plain
            >
                <tr>
                    <td>
                        <Text :typography="Typography.Body2">1. Pengetahuan Kesehatan Gigi</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Label" class="font-semibold" color="text-black">{{ roundScore(educationScore) }}</Text>
                    </td>
                    <td>
                        <ScoreStatusCard
                            :value="educationScore"
                            :rules="educationActionScoreRule"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text :typography="Typography.Body2">2. Sikap Kesehatan Gigi</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Label" class="font-semibold" color="text-black">{{ roundScore(attitudeScore) }}</Text>
                    </td>
                    <td>
                        <ScoreStatusCard
                            :value="attitudeScore"
                            :rules="attitudeScoreRule"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text :typography="Typography.Body2">3. Tindakan Kesehatan Gigi</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Label" class="font-semibold" color="text-black">{{ roundScore(actionScore) }}</Text>
                    </td>
                    <td>
                        <ScoreStatusCard
                            :value="actionScore"
                            :rules="educationActionScoreRule"
                        />
                    </td>
                </tr>
            </DataTable>
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
        attitudeScore: {
            type: Number,
            required: true
        },
        actionScore: {
            type: Number,
            required: true
        },
        educationScore: {
            type: Number,
            required: true
        }
    })

    defineEmits(['dismiss'])

    const tableHeader = [
        "Bagian",
        "Nilai",
        "Kategori"
    ]
</script>