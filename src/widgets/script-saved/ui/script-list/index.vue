<script setup lang="ts">
import {reactive, Reactive, toRefs} from 'vue';
import {ScriptListItem} from './ui/script-list-item/index';

const props = defineProps({
  scripts: <Reactive<any>>reactive([]),
});
const {scripts} = toRefs(props);

const emits = defineEmits(['run-script', 'stop-script', 'delete-script']);
</script>

<template>
  <div class="script-list">
    <div class="script-list__container">
      <script-list-item
        v-for="(script, idx) in scripts"
        :key="idx"
        :name="script.name"
        :is-running="script.isRunning"
        class="script-list__item"
        @run-script="emits('run-script', idx)"
        @stop-script="emits('stop-script', idx)"
        @delete-script="emits('delete-script', idx)"
      >
      </script-list-item>
    </div>
  </div>
</template>

<style>
@import 'style.scss';
</style>