<template>
  <div>
    <div v-if="props.label !== ''">
      <Text :typography="Typography.Body2">{{ props.label }}</Text>
      <Spacer height="h-1" />
    </div>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon v-if="props.leadingIcon != ''" :name="props.leadingIcon" class="text-2xl" />
        </div>
        <label :class="`input input-bordered w-full flex items-center focus:outline-transparent focus:border-black ${passwordLetterSpacing} ${errorStyle} ${leadingSpacing}`" >
          <input 
            v-model="model"
            :type="props.type" 
            :placeholder="props.placeholder" 
            :disabled="!enabled"
            class="grow"
            @keyup.enter="$emit('enter')"
          />
          <Icon 
            v-if="props.trailingIcon != ''" 
            :name="props.trailingIcon" 
            class="txet-2xl" 
            @click="$emit('trailingIconClick')"
           />
        </label>
    </div>
    <Text 
      v-if="errorMessage !== ''" 
      :typography="Typography.Label"
      color="text-error"
    >
      {{ errorMessage }}
    </Text>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  leadingIcon: {
    type: String,
    default: ''
  },
  trailingIcon: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const model = defineModel({
  type: String,
  default: ''
})

defineEmits([
  'trailingIconClick',
  'enter'
])

const passwordLetterSpacing = computed(() => 
  (props.type === 'password' && model.value != '') ? 'tracking-[.5em]' : ''
)

const errorStyle = computed(() => props.errorMessage !== '' ? 'input-error focus:border-error' : '')

const leadingSpacing = computed(() => props.leadingIcon !== '' ? 'ps-11' : '')

</script>