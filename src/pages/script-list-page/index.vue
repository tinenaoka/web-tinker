<script setup lang="ts">
import {computed, onMounted, reactive, Reactive, toRaw} from 'vue';
import {useFeatureRecordLocalStorage} from '../../features/chrome-storage'
import {ScriptList} from './ui/script-list';
import {ScriptListNotFound} from './ui/script-list-not-found';
import {ScriptListNavigation} from './ui/script-list-navigation';
import {useFeatureRunScript} from '../../features/run-script';

let storage = useFeatureRecordLocalStorage;

let runner = useFeatureRunScript;

let scripts = <Reactive<any>>reactive({
  value: []
});

let isSetScripts = computed(() => scripts.value.length > 0)

let keySavedScripts: string = storage.keys.savedScripts;

const onRemoveAllScripts = () => {
  storage.removeLocalStorage(keySavedScripts);
  getStorageSavedScripts();
}

const onRunScript = (idx: number) => {
  runner.runScript(
    toRaw(scripts.value[idx].scripts),
    () => {
      console.log(idx, 'aboba')
    }
  )
}

const getStorageSavedScripts = async () => {
  let storageSavedScripts: Record<string, any> = await storage.getLocalStorage(keySavedScripts);
  if (storageSavedScripts === undefined) {
    return
  }
  scripts.value = storageSavedScripts[keySavedScripts] ?? [];
}

onMounted(() => {
  getStorageSavedScripts();
})
</script>

<template>
  <div
    class="script-list-page"
  >
    <template v-if="isSetScripts">
      <div class="script-list-page__container overflow-custom">
        <script-list
          :scripts="scripts.value"
          @run-script="onRunScript"
        />
      </div>
      <script-list-navigation @remove-all-scripts="onRemoveAllScripts" />
    </template>
    <script-list-not-found v-if="!isSetScripts" />
  </div>
</template>

<style>
@import './style.scss';
</style>