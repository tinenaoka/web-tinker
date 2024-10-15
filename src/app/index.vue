<script setup lang="ts">
import {routes, Routing} from '../pages';
import {LayoutIndex} from '../widgets/layout'
import {useRoute} from 'vue-router';
import {computed} from 'vue';

const route = useRoute();
let classLayout = computed(() => {
  if (route.name === routes[0].name) {
    return '';
  }
  return 'layout-index--main-auto'
})
</script>

<template>
  <div class="app">
    <layout-index
      :class="classLayout"
    >
      <routing/>
    </layout-index>
  </div>
</template>

<style>
@import './style.scss';
</style>