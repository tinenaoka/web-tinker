<script setup lang="ts">
import {InputFieldRefsInterface} from '../../model';

interface InputFieldProps {
  input: InputFieldRefsInterface,
  idx: number
}

const props = defineProps<InputFieldProps>();
const emits = defineEmits(['input'])

const input = Object.assign({}, props.input);

const onInput = () => {
  emits('input', {
    value: input.value.value,
    idx: props.idx
  })
}

</script>

<template>
  <div class="input-filed">
    <input
      v-model="input.value.value"
      :type="input.type"
      :disabled="input.isDisabled"
      :placeholder="input.placeholder"
      @input="onInput"
    >
    <span
      v-html="input.error.value"
      class="form__group__error"
    >
  </span>
  </div>
</template>

<style scoped>

</style>