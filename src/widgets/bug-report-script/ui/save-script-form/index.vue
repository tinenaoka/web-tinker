<script setup lang="ts">
import {AppForm} from '../../../../shared/ui/app-form/index';
import {
  InputField,
  RangeField,
  InputFieldInterface,
  InputFieldRefsInterface,
  RangeFieldInterface, RangeFieldRefsInterface
} from '../../../../shared/ui/app-form/model';
import {useFeatureBugReportScript} from '../../../../features/bug-script';

const bugScript = useFeatureBugReportScript;
interface TimeStamp {
  min: number,
  max: number
}
interface SaveScriptProps {
  timeStamp: TimeStamp
}

const emits = defineEmits(['save-script']);
const props = defineProps<SaveScriptProps>();
const timeStamp = props.timeStamp;

let textInput = {
  ...Object.assign({}, InputField),
  type: 'text',
  isRequired: true,
  name: 'name',
  placeholder: 'name',
  value: bugScript.generateBugScriptName(),
};

let rangeInput = {
  ...Object.assign({}, RangeField),
  isRequired: true,
  min: timeStamp.min,
  max: timeStamp.max,
  valueMin: timeStamp.min,
  valueMax: timeStamp.max,
  step: 0
};

const inputsForm: InputFieldInterface[] = [
  textInput,
];

const rangesForm: RangeFieldInterface[] = [
  rangeInput
];

const onSaveScript = (formData: {inputs: InputFieldRefsInterface[], ranges: RangeFieldRefsInterface[]}) => {
  const range = formData.ranges[0];

  emits('save-script', {
    name: formData.inputs[0].value.value,
    timeStamp: [+range.valueMin.value, +range.valueMax.value],
  })
}

const getTimeFromTimestamp = (timestamp: number | null) => {
  if (timestamp === null) {
    return
  }
  return new Date(timestamp).toLocaleString('en-US',  {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
}
</script>

<template>
  <div class="save-script-form">
    <app-form
      :inputs="inputsForm"
      :ranges="rangesForm"
      :is-need-validate-form-on-init="true"
      @submit="onSaveScript"
    >
      <template #current-value-min-0="{range}">
        <span class="range-filed__current-value-min">{{ getTimeFromTimestamp(range?.valueMin.value) }}</span>
      </template>
      <template #current-value-max-0="{range}">
        <span class="range-filed__current-value-max">{{ getTimeFromTimestamp(range?.valueMax.value) }}</span>
      </template>
    </app-form>
  </div>
</template>

<style scoped>

</style>