<script setup lang="ts">
import {toRefs} from 'vue';
import {icons} from './model';
interface IconButtonProps {
  icon: typeof icons[keyof typeof icons];
}

const props = defineProps<IconButtonProps>();
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