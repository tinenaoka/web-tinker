<script setup lang="ts">
import {computed, onMounted, reactive, Reactive} from 'vue';
import {ScriptList} from './ui/script-list';
import {ScriptListNotFound} from './ui/script-list-not-found';
import {ScriptListNavigation} from './ui/script-list-navigation';
import {useFeatureRunScript} from '../../features/run-script';
import {useFeatureRecordLocalStorage} from '../../../browser/storage';
import {addMessageListener} from '../../../browser/runtime/model/addMessageListener';
import {ActionsEvent} from '../../../entities';
import {useFeatureListScript} from '../../features/list-script';

let storage = useFeatureRecordLocalStorage;
let runner = useFeatureRunScript;
let listScript = useFeatureListScript;

let scripts = <Reactive<any>>reactive({
  value: []
});

let isSetScripts = computed(() => scripts.value.length > 0)

const onRemoveAllScripts = async (): Promise<void> => {
  await storage.clearLocalStorage()
  await getStorageSavedScripts();
}

const onRunScript = async (idx: number): Promise<void> => {
  await runner.runScript(scripts.value[idx].id)
  await getStorageSavedScripts();
}

const onStopScript = async (idx: number): Promise<void> => {
  await runner.stopScript(scripts.value[idx].id)
  await getStorageSavedScripts();
}

const onDeleteScript = async (idx: number): Promise<void> => {
  await onStopScript(idx);
  await listScript.deleteScript(scripts.value[idx])
  await getStorageSavedScripts();
}

const getStorageSavedScripts = async (): Promise<void> => {
  scripts.value = await listScript.getSavedScripts();
}

addMessageListener(async (message: any): Promise<void> => {
  if (message.action !== ActionsEvent.StopScripting) {
    return;
  }
  await runner.stopActiveScript()
  await getStorageSavedScripts();
})

onMounted((): void => {
  getStorageSavedScripts();
})
</script>

<template>
  <div class="script-list">
    <template v-if="isSetScripts">
      <div class="script-list__container overflow-custom">
        <script-list
          :scripts="scripts.value"
          @run-script="onRunScript"
          @stop-script="onStopScript"
          @delete-script="onDeleteScript"
        />
      </div>
      <script-list-navigation @remove-all-scripts="onRemoveAllScripts"/>
    </template>
    <script-list-not-found v-if="!isSetScripts"/>
  </div>
</template>

<style>
@import "style.scss";
</style>