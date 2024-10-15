<script setup lang="ts">
import {Logo} from '../../../shared/ui/logo'
import {Navigation} from '../../../shared/ui/navigation'
</script>

<template>
  <div class="layout-index">
    <div class="layout-index__container">
      <header>
        <logo class="layout-index__logo"/>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <navigation class="layout-index__navigation" />
      </footer>
    </div>
  </div>
</template>

<style>
@import '../style.scss';
</style>