<template>
  <div class="flex flex-wrap justify-between items-center" @click="$emit('click')">
    <div class="flex-1">
      <Text :typography="Typography.Label" color="text-content-primary">{{ props.name }}</Text>
      <Text :typography="Typography.Body1">{{ props.lastReadType }} - halaman {{ props.lastReadPageNumber }}</Text>
    </div>
    <Button 
      dense
      @click="$emit('presence')"
    >
      Presensi
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Typography } from './attr/TextAttr';

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  lastReadType: {
    type: String,
    default: ''
  },
  lastReadPageNumber: {
    type: String,
    default: ''
  },
  lastReadGrade: {
    type: String,
    default: ''
  },
  attendance: {
    type: Boolean,
    default: undefined
  }
})

defineEmits(['click', 'presence'])

</script>