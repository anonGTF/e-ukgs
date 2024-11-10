<template>
  <div class="border border-border-primary rounded-lg p-4">
    <div class="flex justify-between content-center">
      <span class="flex gap-2">
        <ic-calendar class="mb-0 text-xl"/>
        <Text :typography="Typography.Body1" class="font-bold">{{ date.value }}</Text>
      </span> 
      <Text class="flex items-center">{{ startTime.value }} - {{ endTime.value }}</Text>
    </div>
    <Spacer height="h-4" />
    <div class="flex gap-4">
      <div class="flex-1 bg-background-secondary rounded-lg text-center py-3">
        <Text>{{ props.attend }}</Text>
        <Text :typography="Typography.Label">Hadir</Text>
      </div>
      <div class="flex-1 bg-background-secondary rounded-lg text-center py-3">
        <Text>{{ props.absent }}</Text>
        <Text :typography="Typography.Label">Tidak Hadir</Text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography } from '~/components/attr/TextAttr'

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  attend: {
    type: Number,
    required: true
  },
  absent: {
    type: Number,
    required: true
  },
})

const date = computed(() => useDateFormat(props.date, 'dddd, D MMM YYYY', { locales: 'id-ID' }))
const startTime = computed(() => useDateFormat(props.startTime, 'HH:mm', { locales: 'id-ID' }))
const endTime = computed(() => useDateFormat(props.endTime, 'HH:mm', { locales: 'id-ID' }))
</script>