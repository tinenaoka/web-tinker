<script setup lang="ts">
const props = defineProps({
  icon: String,
});
</script>

<template>
  <button class="icon-button">
    <slot name="title"></slot>
    <i :class="props.icon" class="icon"></i>
  </button>
</template>

<style>
@import './style.scss';
</style>