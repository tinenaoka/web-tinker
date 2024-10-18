<script setup lang="ts">
import {computed, ref, toRefs, watch} from 'vue';
import {InputFieldInterface, InputFieldRefsInterface, REFS_OVERRIDE_FIELDS} from '../model';
import {MainButton} from '../../main-button/index';

const emits = defineEmits(['submit'])
const props = defineProps({
  inputs: Array<InputFieldInterface>,
  isInlineForm: Boolean
});

const {isInlineForm, inputs} = toRefs(props);

const classForm = computed(() => isInlineForm ? 'form--inline' : '')

let inputsForm = Object.assign([], inputs)
  .map((item: InputFieldInterface): InputFieldRefsInterface => {
    const itemRef = structuredClone(item) as unknown as InputFieldRefsInterface;
    for (let key of REFS_OVERRIDE_FIELDS) {
      itemRef[key] = ref(item.value ?? '')
    }
    return itemRef;
  })
let isCanSubmit = false;

watch(
  () => inputsForm || [],
  (inputs: Array<InputFieldRefsInterface>) => {
    isCanSubmit = true;
    let inputError = inputs.find(item => {
      return item.error.value !== ''
    });
    if (inputError !== undefined) {
      isCanSubmit = false;
    }
  },
  {deep: true}
)

const getRequiredError = (name: string): string => {
  return `The field ${name} is required`
}

const validateInput = (input: InputFieldRefsInterface): void => {
  input.error.value = '';
  if (!input.isRequired) {
    return
  }
  if (
    input.value.value === null ||
    input.value.value === ''
  ) {
    input.error.value = getRequiredError(input.name);
    return;
  }
}

</script>

<template>
  <div
    :class="classForm"
    class="form"
  >
    <div
      v-for="(input, idx) in inputsForm"
      :key="idx"
      class="form__group"
    >
      <input
        v-model="input.value.value"
        :type="input.type"
        :disabled="input.isDisabled"
        :placeholder="input.placeholder"
        @input="validateInput(input)"
      >
      <span
        v-html="input.error.value"
        class="form__group__error"
      >
      </span>
    </div>
    <div class="form__button-submit">
      <main-button
        :disabled="!isCanSubmit"
        @click="emits('submit', inputs)"
      >
        <template #title>Save</template>
      </main-button>
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>