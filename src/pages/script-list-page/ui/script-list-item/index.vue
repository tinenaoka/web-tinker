<script setup lang="ts">
import {IconButton} from '../../../../shared/ui/icon-button/index';
import {icons} from '../../../../shared/ui/icon-button/model';

const props = defineProps({
  name: String,
});
const emits = defineEmits(['run-script']);
</script>

<template>
  <div class="script-list-item">
    <span class="script-list-item__name">{{ props.name }}</span>
    <div class="script-list-item__navigation">
      <icon-button
        :icon="icons.run"
        @click="emits('run-script')"
      />
      <icon-button :icon="icons.close" />
      <icon-button :icon="icons.await" :disabled="true" />
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>