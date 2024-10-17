<script setup lang="ts">
import {computed, onMounted, reactive, Reactive} from 'vue';
import {ScriptList} from './ui/script-list';
import {ScriptListNotFound} from './ui/script-list-not-found';
import {ScriptListNavigation} from './ui/script-list-navigation';
import {useFeatureRunScript} from '../../features/run-script';
import {useFeatureRecordLocalStorage} from '../../../chrome/storage';
import {addListener} from '../../../chrome/runtime/model/addListener';

let storage = useFeatureRecordLocalStorage;

const STOP_SCRIPTING_ACTION = 'stop-scripting';

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

const onRunScript = async (idx: number) => {
  await runner.runScript(scripts.value[idx].id)
  await getStorageSavedScripts();
}

const onStopScript = async (idx: number) => {
  await runner.stopScript(scripts.value[idx].id)
  await getStorageSavedScripts();
}

const getStorageSavedScripts = async () => {
  let scriptsSaved: unknown = await storage.getLocalStorage(keySavedScripts);
  scripts.value = scriptsSaved ?? [];
}

addListener(async (message: any) => {
  if (message.action !== STOP_SCRIPTING_ACTION) {
    return;
  }
  await runner.stopActiveScript()
  await getStorageSavedScripts();
})

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