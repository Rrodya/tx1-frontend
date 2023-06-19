<template>
  <button class="tx-button btn active:bg-purple-400 transition-colors" @click="handleButton" :class="props.classes">
    {{ props.text }}
  </button>
</template>

<style>
.tx-button p {
  color: #278ce5;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "txButton",
  props: {
    text: String,
    classes: Array,
    disabled: Boolean
  },
  setup(props, { emit }) {
    function handleButton() {
      emit("handle");
    }

    return {
      props,
      handleButton
    }
  }
})
</script>
