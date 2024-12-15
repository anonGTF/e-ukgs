<template>
    <div class="dropdown" :class="{'w-full': fullWidth}">
        <div v-if="label !== ''">
          <Text :typography="labelTypography" :class="labelClass">{{ label }}</Text>
          <Spacer height="h-1" />
        </div>
        <div tabindex="0" role="button" class="border border-border-primary rounded-lg px-4 py-3 flex items-center">
            <Text :typography="Typography.Body2" class="flex-1" :class="placeholderOverflow == PlaceholderOverflowType.ELLIPSIS ? 'truncate' : ''">
                {{ safePlaceholder }}
            </Text>
            <Icon name="mdi:chevron-down" class="text-2xl"/>
        </div>
        <Text 
            v-if="errorMessage !== ''" 
            :typography="Typography.Label"
            color="text-error"
        >
            {{ errorMessage }}
        </Text>
        <div tabindex="0" ref="dropdown" class="dropdown-content mt-2 w-full h-64 z-[1] overflow-y-scroll shadow-xl bg-base-100 rounded-box border border-border-primary [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <TextField
                v-if="searchPlaceholder != ''"
                v-model="query"
                class="py-4 px-4 sticky top-0 bg-white z-100"
                :placeholder="searchPlaceholder"
                leading-icon="ic-search"
            />
            <ul tabindex="0" class="menu p-0 overflow-y-hidden" :class="searchPlaceholder == '' ? 'mt-3' : ''">
                <template v-for="option in options">
                    <li v-if="filteredOptions.includes(option)"  @click="select(option)">
                        <a>
                            <div class="py-3 px-4">
                                <Text>
                                    {{ option.label }}
                                </Text>
                            </div>
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        searchPlaceholder: {
            type: String,
            default: ''
        },
        errorMessage: {
            type: String,
            default: ''
        },
        options: {
            type: Array as PropType<CustomDropdownOption<any>[]>,
            required: true
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Object as PropType<CustomDropdownOption<any>>,
            default: null
        },
        labelClass: {
            type: String,
            default: ''
        },
        labelTypography: {
            type: String as PropType<Typography>,
            default: Typography.Body2
        },
        placeholderOverflow: {
            type: Number as PropType<PlaceholderOverflowType>,
            default: PlaceholderOverflowType.SHOW
        }
    })

    const emit = defineEmits<{
        change: [data: CustomDropdownOption<any>]
    }>()

    const query = ref('')
    const dropdown = ref(null)
    const filteredOptions = computed(() => 
        props.options.filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase()))
    )

    const safePlaceholder = computed(() => {
        if (props.options.length === 0 || props.selected == null || !props.options.includes(props.selected)) {
            return props.placeholder
        }
        return props.selected.label
    })

    const select = (selected: CustomDropdownOption<any>) => {
        emit('change', selected)
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    }
</script>