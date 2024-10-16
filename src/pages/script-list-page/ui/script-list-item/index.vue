<script setup lang="ts">
import {IconButton} from '../../../../shared/ui/icon-button/index';
import {icons} from '../../../../shared/ui/icon-button/model';
import {computed} from 'vue';

const props = defineProps({
  name: String,
  isRunning: Boolean,
});
const emits = defineEmits(['run-script', 'stop-script']);

let iconAction = computed(() => props.isRunning ? icons.await : icons.run )
</script>

<template>
  <div class="script-list-item">
    <span class="script-list-item__name">{{ props.name }}</span>
    <div class="script-list-item__navigation">
      <icon-button
        :icon="iconAction"
        :disabled="props.isRunning"
        @click="emits('run-script')"
      />
      <icon-button
        :icon="icons.close"
        :disabled="props.isRunning"
      />
      <icon-button
        v-if="props.isRunning"
        :icon="icons.stop"
        @click="emits('stop-script')"
      />
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>