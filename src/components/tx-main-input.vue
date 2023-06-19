<template>
    <label>
        <p v-if="props.label" class="text-purple-four pb-2 pt-2">{{ props.label }}</p>
        <input
          v-if="props.text == 'text'"
          :type="props.text"
          class="bg-purple-200 tracking-normal focus:bg-purple-300 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-purple-five placeholder-purple-400 rounded-xl py-3 pl-3"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <input
          v-else-if="props.text == 'password'"
          type="password"
          class="bg-purple-200 tracking-normal focus:bg-purple-300 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-purple-five placeholder-purple-400 rounded-xl py-3 pl-3"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <input
          v-else-if="props.text == 'phone'"
          aria-label="Телефон"
          placeholder="+7"
          v-mask="'+7 ### ### ####'"
          class="bg-purple-200 tracking-normal focus:bg-purple-300 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-purple-five placeholder-purple-400 rounded-xl py-3 pl-3"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <input
          v-else-if="props.text == 'number'"
          type="number"
          class="bg-purple-200 tracking-normal focus:bg-purple-300 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-purple-five placeholder-purple-400 rounded-xl py-3 pl-3"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <textarea
          v-else-if="props.text"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          class="bg-purple-200 tracking-normal focus:bg-purple-300 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-purple-five placeholder-purple-400 rounded-xl py-3 pl-3"
          @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </label>
</template>

<script lang="ts">

import { defineComponent, ref} from "vue";

export default defineComponent({
    name: "tx-main-input",
    props: {
        modelValue: String,
        placeholder: String,
        label: String,
        type: String,
        text: String
    },
    setup: (props, { emit }) => {
        return {
            props
        }
    }
})

</script>
<style></style>
