<template>
  <div class="border border-border-primary rounded-lg py-6 px-4">
    <div class="flex gap-2 items-center justify-center">
      <component :is="props.icon" class="text-2xl mt-1 text-content-secondary"/>
      <Text :typography="Typography.Label" class="text-content-primary">{{ props.title }}</Text>
    </div>
    <Spacer height="h-4"/>
    <div class="flex items-center justify-center gap-6">
      <svg class="-rotate-90 -mt-6" width="120px" height="120px" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-circle-absent" :style="absentStyle" cx="48" cy="48" r="43"></circle>
        <circle class="progress-circle-attend" :style="attendStyle" cx="48" cy="48" r="43"></circle>
      </svg>
      <div>
        <div class="flex items-center gap-3">
          <div class="rounded-full w-3 h-3 bg-content-success"></div>
          <div>
            <Text>{{ props.attend }}</Text>
            <Text :typography="Typography.Body3">Hadir</Text>
          </div>
        </div>
        <Spacer height="h-4"/>
        <div class="flex items-center gap-3">
          <div class="rounded-full w-3 h-3 bg-content-error"></div>
          <div>
            <Text>{{ props.absent }}</Text>
            <Text :typography="Typography.Body3">Tidak Hadir</Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography } from './attr/TextAttr';

const props = defineProps({
  attend: {
    type: Number,
    default: 0
  },
  absent: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

  const attendDashArray = computed(() => Math.ceil(props.attend / (props.attend + props.absent) * 257))
  const absentDastArray = computed(() => 240 - attendDashArray.value)
  const absentDashOffset = computed(() => attendDashArray.value * (-1) - 15)

  const attendStyle = reactive({
    'stroke-dasharray': `${attendDashArray.value} 999`
  })
  const absentStyle = reactive({
    'stroke-dasharray': `${absentDastArray.value} 999`,
    'stroke-dashoffset': `${absentDashOffset.value}`
  })
</script>

<style>
.progress-circle-absent {
	fill: none; 
	stroke: #EE3D30;
	stroke-width: 10px;
  stroke-linecap: round;
    transition: stroke-dasharray 0.7s linear 0s;
}

.progress-circle-attend {
	fill: none; 
	stroke: #2DC653;
	stroke-width: 10px;  
  stroke-linecap: round;   
	stroke-dashoffset: 0;
    transition: stroke-dasharray 0.7s linear 0s;
}
</style>