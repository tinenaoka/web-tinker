<script setup lang="ts">
import {computed, reactive, Reactive} from 'vue';
import {ScriptListItem} from '../../script-list-item/index';

const props = defineProps({
  scripts: <Reactive<any>>reactive([]),
});
let scripts = computed(() => props.scripts);

const emits = defineEmits(['run-script']);
</script>

<template>
  <div class="script-list">
    <div class="script-list__container">
      <script-list-item
        v-for="(script, idx) in scripts"
        :key="idx"
        :name="script.name"
        class="script-list__item"
        @run-script="emits('run-script', idx)"
      >
      </script-list-item>
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>