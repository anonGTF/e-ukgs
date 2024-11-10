<template>
    <div class="dropdown w-full">
        <div v-if="props.label !== ''">
          <Text :typography="Typography.Body2">{{ props.label }}</Text>
          <Spacer height="h-1" />
        </div>
        <div tabindex="0" role="button" class="border border-border-primary rounded-lg px-4 py-3 flex items-center">
            <Text :typography="Typography.Body2" class="flex-1">
                {{ model === '' ? props.placeholder : model }}
            </Text>
            <ic-chevron-down class="text-2xl"/>
        </div>
        <div tabindex="0" ref="dropdown" class="dropdown-content mt-2 w-full h-64 z-[1] overflow-y-scroll shadow bg-base-100 rounded-box border border-border-primary [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <TextField
                v-model="query"
                class="pt-4 px-4 sticky top-0 bg-white z-10"
                :placeholder="props.textFieldPlaceholder"
                leading-icon="ic-search"
            />
            <ul tabindex="0" class="menu p-0 overflow-y-hidden">
                <li v-for="option in filteredOptions" @click="select(option.key)">
                    <Text class="py-3">
                        {{ option.label }}
                    </Text>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Typography } from './attr/TextAttr';

    type FilterOption = {
        key: string,
        label: string
    }

    const model = defineModel({
        type: String,
        default: ''
    })

    const props = defineProps({
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        textFieldPlaceholder: {
            type: String,
            default: ''
        },
        options: {
            type: Array<string>,
            default:() => ([])
        }
    })

    const query = ref('')
    const dropdown = ref(null)
    const { focused } = useFocus(dropdown)
    const filteredOptions = computed(() => 
        props.options.map<FilterOption>((option, index) => (
            { 
                key: option,
                label: `${index + 1}.   ${option}`
            }
        )).filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase()))
    )

    const select = (selected: string) => {
        model.value = selected
        focused.value = false
    }
</script>