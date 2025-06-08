<script setup lang="ts">
import {computed, onMounted, ref, toRefs, watch} from 'vue';
import {
  InputFieldInterface,
  InputFieldRefsInterface,
  RangeFieldInterface,
  RangeFieldRefsInterface,
  REFS_INPUT_OVERRIDE_FIELDS,
  REFS_RANGE_OVERRIDE_FIELDS
} from './model';
import {MainButton} from '../main-button';
import {InputFiled} from './ui/input-filed/index';
import {RangeFiled} from './ui/range-filed/index';

interface AppFormProps {
  isInlineForm?: boolean | false,
  inputs?: InputFieldInterface[],
  ranges?: RangeFieldInterface[],
  isNeedValidateFormOnInit?: boolean | false
}

const emits = defineEmits(['submit'])
const props = defineProps<AppFormProps>();

const {isInlineForm, inputs, ranges} = toRefs(props);

const classForm = computed(() => isInlineForm.value ? 'form--inline' : '')

let inputsForm = Object.assign([], inputs?.value)
  .map((item: InputFieldInterface): InputFieldRefsInterface => {
    const itemRef = structuredClone(item) as unknown as InputFieldRefsInterface;
    for (let key of REFS_INPUT_OVERRIDE_FIELDS) {
      itemRef[key] = ref(item[key] ?? '');
    }
    return itemRef;
  })
let rangesForm = Object.assign([], ranges?.value)
  .map((item: RangeFieldInterface): RangeFieldRefsInterface => {
    const itemRef = structuredClone(item) as unknown as RangeFieldRefsInterface;
    for (let key of REFS_RANGE_OVERRIDE_FIELDS) {
      itemRef[key] = ref(item[key] ?? 0);
    }
    return itemRef;
  })

let isCanSubmit = ref(false);

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

const onInputField = (inputFieldData: {idx: number, value: string}) => {
  let input = inputsForm[inputFieldData.idx];
  input.value.value = inputFieldData.value;
  validateInput(input);
}

const onChangeRange = (rangeData: {idx: number, min: number, max: number}) => {
  let range = rangesForm[rangeData.idx];
  range.valueMin.value = rangeData.min;
  range.valueMax.value = rangeData.max;
}

const onSubmit = () => {
  emits('submit', {
    inputs: inputsForm,
    ranges: rangesForm
  })
}

const validateInputs = (inputs: Array<InputFieldRefsInterface>) => {
  isCanSubmit.value = true;
  let inputError = inputs.find(item => {
    return item.error.value !== ''
  });
  if (inputError !== undefined) {
    isCanSubmit.value = false;
  }
}

watch(
  () => inputsForm || [],
  (inputs: Array<InputFieldRefsInterface>) => {
    validateInputs(inputs)
  },
  {deep: true}
)

onMounted(() => {
  if (props.isNeedValidateFormOnInit) {
    validateInputs(inputsForm)
  }
})
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
      <input-filed
        :input="input"
        :idx="idx"
        @input="onInputField"
      />
    </div>
    <div
      v-for="(range, idx) in rangesForm"
      :key="idx"
      class="form__group"
    >
      <range-filed
        :idx="idx"
        :range="range"
        @change-values="onChangeRange"
      >
        <template #placeholder-min>
          <slot :name="'placeholder-min-' + idx"></slot>
        </template>
        <template #placeholder-max>
          <slot :name="'placeholder-max-' + idx"></slot>
        </template>
        <template #current-value-min>
          <slot :name="'current-value-min-' + idx" :range="range"></slot>
        </template>
        <template #current-value-max>
          <slot :name="'current-value-max-' + idx" :range="range"></slot>
        </template>
      </range-filed>
    </div>
    <div class="form__button-submit">
      <main-button
        :disabled="!isCanSubmit"
        @click="onSubmit"
      >
        <template #title>Save</template>
      </main-button>
    </div>
  </div>
</template>

<style>
@import 'style.scss';
</style>