<script setup lang="ts">
import {AppForm} from '../../../../shared/ui/app-form/index'
import {InputField, InputFieldInterface, InputFieldRefsInterface} from '../../../../shared/ui/app-form/model';

const emits = defineEmits(['save-script']);

let textInput = {
  ...Object.assign({}, InputField),
  type: 'text',
  isRequired: true,
  name: 'name',
  placeholder: 'name'
};

const inputsForm: InputFieldInterface[] = [
  textInput,
];

const onSaveScript = (formData: {inputs: InputFieldRefsInterface[]}) => {
  emits('save-script', formData.inputs[0].value.value)
}
</script>

<template>
  <div class="save-script-form">
    <app-form
      :inputs="inputsForm"
      :is-inline-form="true"
      @submit="onSaveScript"
    />
  </div>
</template>

<style>
@import "style.scss";
</style>