<script setup lang="ts">
import {Routing} from '../pages';
import {IndexLayout} from './ui/index-layout'
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import {Routes} from '../../entities';

const route = useRoute();
let classLayout = computed(() => {
  if (route.name === Routes.ScriptList) {
    return 'layout-index--main-auto';
  }
  return ''
})
</script>

<template>
  <div class="app">
    <index-layout
      :class="classLayout"
    >
      <routing/>
    </index-layout>
  </div>
</template>

<style>
@import './style.scss';
</style>