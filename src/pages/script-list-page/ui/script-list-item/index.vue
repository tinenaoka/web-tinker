<script setup lang="ts">
import {IconButton} from '../../../../shared/ui/icon-button/index';
import {icons} from '../../../../shared/ui/icon-button/model';
import {computed} from 'vue';

const props = defineProps({
  name: String,
  isRunning: Boolean,
});
const emits = defineEmits(['run-script', 'stop-script', 'delete-script']);

let iconAction = computed(() => props.isRunning ? icons.stop : icons.run );

const onClickToActionIcon = () => {
  props.isRunning ? emits('stop-script') : emits('run-script')
}

const onClickToDeleteIcon = () => {
  emits('delete-script')
}
</script>

<template>
  <div class="script-list-item">
    <span class="script-list-item__name">{{ props.name }}</span>
    <div class="script-list-item__navigation">
      <icon-button
        :icon="iconAction"
        @click="onClickToActionIcon"
      />
      <icon-button
        :icon="icons.close"
        :disabled="props.isRunning"
        @click="onClickToDeleteIcon"
      />
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>