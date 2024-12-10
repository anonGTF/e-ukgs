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
          <label :class="`input input-bordered w-full flex items-center focus:outline-transparent focus:border-black ${errorStyle} ${leadingSpacing}`" >
            <input 
                :value="formattedValue"
                type="text" 
                :placeholder="placeholder" 
                :disabled="!enabled"
                class="grow"
                @input="onInputChange"
                @keyup.enter="$emit('enter')"
            />
            <Icon 
              v-if="trailingIcon != ''" 
              :name="trailingIcon" 
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
        modelValue: {
            type: Number,
            required: true,
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
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    })
    
    const model = defineModel({
        type: Number,
        default: 0
    })
    
    defineEmits([
        'trailingIconClick',
        'enter'
    ])

    const numberFormatter = new Intl.NumberFormat("id-ID")

    const formattedValue = computed(() => numberFormatter.format(model.value))
    
    const onInputChange = (e: Event) => {
        const payload = e.target as HTMLInputElement
        const rawValue = payload.value.replace(/[^\d]/g, "")
        const parsedValue = rawValue ? parseInt(rawValue, 10) : 0
        model.value = parsedValue
    }

    const errorStyle = computed(() => props.errorMessage !== '' ? 'input-error focus:border-error' : '')
    const leadingSpacing = computed(() => props.leadingIcon !== '' ? 'ps-11' : '')
  </script>