<script setup lang="ts">
import {IconButton} from '../../../../../../shared/ui/icon-button/index';
import {icons} from '../../../../../../shared/ui/icon-button/model';
import {computed, toRefs} from 'vue';

const props = defineProps({
  name: String,
  isRunning: Boolean,
});
const {name, isRunning} = toRefs(props);

const emits = defineEmits(['run-script', 'stop-script', 'delete-script']);

let iconAction = computed(() => isRunning.value ? icons.stop : icons.run);

const onClickToActionIcon = (): void => {
  isRunning.value ? emits('stop-script') : emits('run-script')
}

const onClickToDeleteIcon = (): void => {
  emits('delete-script')
}
</script>

<template>
  <div class="script-list-item">
    <span class="script-list-item__name">{{ name }}</span>
    <div class="script-list-item__navigation">
      <icon-button
        :icon="iconAction"
        @click="onClickToActionIcon"
      />
      <icon-button
        :icon="icons.close"
        :disabled="isRunning"
        @click="onClickToDeleteIcon"
      />
    </div>
  </div>
</template>

<style>
@import 'style.scss';
</style>