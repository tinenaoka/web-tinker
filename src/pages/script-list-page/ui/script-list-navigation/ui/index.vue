<script setup lang="ts">
import {MainButton} from '../../../../../shared/ui/main-button/index';

const emits = defineEmits(['remove-all-scripts']);
</script>

<template>
  <div
    class="script-list-page__navigation"
  >
    <main-button
      @click="emits('remove-all-scripts')"
    >
      <template #title>Remove all scripts</template>
    </main-button>
  </div>
</template>

<style scoped>

</style>