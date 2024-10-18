<script setup lang="ts">
import {toRefs} from 'vue';

const props = defineProps({
  icon: String,
});
const {icon} = toRefs(props);
</script>

<template>
  <button class="icon-button">
    <slot name="title"></slot>
    <i :class="icon" class="icon"></i>
  </button>
</template>

<style>
@import './style.scss';
</style>