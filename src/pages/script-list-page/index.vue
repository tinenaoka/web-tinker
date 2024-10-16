<script setup lang="ts">
import {computed, onMounted, reactive, Reactive, toRaw} from 'vue';
import {ScriptList} from './ui/script-list';
import {ScriptListNotFound} from './ui/script-list-not-found';
import {ScriptListNavigation} from './ui/script-list-navigation';
import {useFeatureRunScript} from '../../features/run-script';
import {useFeatureRecordLocalStorage} from '../../../chrome/storage';

let storage = useFeatureRecordLocalStorage;

let runner = useFeatureRunScript;

let scripts = <Reactive<any>>reactive({
  value: []
});

let isSetScripts = computed(() => scripts.value.length > 0)

let keySavedScripts: string = storage.keys.savedScripts;

const onRemoveAllScripts = async () => {
  await storage.clearLocalStorage()
  await getStorageSavedScripts();
}

const onRunScript = (idx: number) => {
  scripts.value[idx].isRunning = true;
  runner.runScript(toRaw(scripts.value[idx].scripts))
}

const onStopScript = (idx: number) => {
  scripts.value[idx].isRunning = false;
  runner.stopScript()
}

const getStorageSavedScripts = async () => {
  let scriptsSaved: unknown = await storage.getLocalStorage(keySavedScripts);
  scripts.value = scriptsSaved ?? [];
  scripts.value.map((script: any) => {
    return {
      ...script,
      isRunning: false
    };
  })
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
          @stop-script="onStopScript"
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