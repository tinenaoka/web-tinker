<script setup lang="ts">
import {RouteLocationAsRelative} from 'vue-router';

interface LinkInterface {
  path: RouteLocationAsRelative,
  label: string
}
const links: Array<LinkInterface> = [
  {
    path: {
      name: 'Index'
    },
    label: 'Record',
  },
  {
    path: {
      name: 'ScriptList'
    },
    label: 'Scripts',
  },
];

</script>

<template>
  <div class="navigation">
    <ul>
      <li
        v-for="(link, idx) in links"
        :key="idx"
        class="navigation__item"
      >
        <router-link
          :to="link.path"
          class="main-link"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>