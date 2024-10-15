<script setup lang="ts">
import {routes} from '../../../../index';

let pathToRecordScript = {
  name: routes[0].name
}
</script>

<template>
  <div class="script-list-page__not-found">
    <router-link :to="pathToRecordScript" class="main-link">
      Start record new script scripts
    </router-link>
  </div>
</template>

<style scoped>

</style>