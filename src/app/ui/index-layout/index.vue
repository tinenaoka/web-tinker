<script setup lang="ts">
import {LogoLayout} from './ui/logo-layout'
import {NavigationLayout} from './ui/navigation-layout'
</script>

<template>
  <div class="layout-index">
    <div class="layout-index__container">
      <header>
        <logo-layout class="layout-index__logo"/>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <navigation-layout class="layout-index__navigation"/>
      </footer>
    </div>
  </div>
</template>

<style>
@import 'style.scss';
</style>