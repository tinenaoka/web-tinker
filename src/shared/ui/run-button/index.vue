<script setup lang="ts">
import {computed, toRefs} from 'vue';

interface RunButtonProps {
  text: string,
  textStop?: string,
  isRunning?: boolean
}

const props = defineProps<RunButtonProps>();
const {isRunning, text, textStop} = toRefs(props);

const emits = defineEmits(['run'])

const onClickButton = (): void => {
  emits('run');
}

const classButton = computed(() => isRunning.value ? 'run-button--running' : '')
const textButton = computed(() => isRunning.value ? textStop : text);
</script>

<template>
  <div
    :class="classButton"
    class="run-button"
    @click="onClickButton"
  >
    <button>
      <span>{{ textButton }}</span>
    </button>
  </div>
</template>

<style>
@import './style.scss';
</style>