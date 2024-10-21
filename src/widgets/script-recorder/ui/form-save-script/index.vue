<script setup lang="ts">
import {FormApp} from '../../../../shared/ui/form-app/index'
import {InputField, InputFieldInterface, InputFieldRefsInterface} from '../../../../shared/ui/form-app/model';

const emits = defineEmits(['save-script']);

let textInput = {
  ...Object.assign({}, InputField),
  type: 'text',
  isRequired: true,
  name: 'name',
  placeholder: 'name'
} as unknown as InputFieldInterface;

const inputsForm: Array<InputFieldInterface> = [
  textInput,
];

const onSaveScript = (inputs: Array<InputFieldRefsInterface>) => {
  emits('save-script', inputs[0].value.value)
}
</script>

<template>
  <div class="save-script-form">
    <form-app
      :inputs="inputsForm"
      :is-inline-form="true"
      @submit="onSaveScript"
    />
  </div>
</template>

<style>
@import "style.scss";
</style>