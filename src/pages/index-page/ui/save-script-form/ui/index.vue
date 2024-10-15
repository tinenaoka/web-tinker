<script setup lang="ts">
import {FormCustom} from '../../../../../shared/ui/form-custom'
import {InputField, InputFieldInterface, InputFieldRefsInterface} from '../../../../../shared/ui/form-custom/model';

const emits = defineEmits(['save-script']);

const inputsForm: Array<InputFieldInterface> = [
  {
    ...Object.assign({}, InputField),
    type: 'text',
    isRequired: true,
    name: 'name',
    placeholder: 'name'
  },
];

const onSaveScript = (inputs: Array<InputFieldRefsInterface>) => {
  emits('save-script', inputs[0].value.value)
}
</script>

<template>
  <div class="save-script-form">
    <form-custom
      :inputs="inputsForm"
      :is-inline-form="true"
      @submit="onSaveScript"
    />
  </div>
</template>

<style>
@import "../styles.scss";
</style>