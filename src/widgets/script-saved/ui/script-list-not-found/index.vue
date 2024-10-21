<script setup lang="ts">
import {routes} from '../../../../pages/index';
import {RouteLocationAsRelative} from 'vue-router';

let pathToRecordScript: RouteLocationAsRelative = {
  name: routes[0].name,
}
</script>

<template>
  <div class="script-list__not-found">
    <router-link :to="pathToRecordScript" class="main-link">
      Start record new script scripts
    </router-link>
  </div>
</template>

<style scoped>

</style>