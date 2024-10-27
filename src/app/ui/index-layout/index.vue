<script setup lang="ts">
import {LayoutLogo} from './ui/layout-logo'
import {LayoutNavigation} from './ui/layout-navigation'
</script>

<template>
  <div class="layout-index">
    <div class="layout-index__container">
      <header>
        <layout-logo class="layout-index__logo"/>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <layout-navigation class="layout-index__navigation"/>
      </footer>
    </div>
  </div>
</template>

<style>
@import 'style.scss';
</style>