<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {SaveScriptForm} from '../../pages/index-page/ui/save-script-form'
import {onMounted, Ref, ref, onBeforeUnmount, computed, Reactive, reactive, toRaw} from 'vue';
import {useFeatureRecordScript} from '../../features/record-script'
import {useFeatureRecordLocalStorage} from '../../features/chrome-storage'
let script = useFeatureRecordScript;
let storage = useFeatureRecordLocalStorage;

let isRunning = <Ref>ref(false);
let recordedScript = <Reactive<any>>reactive({
  value: []
});
let keyIsRunningStorage: string = storage.keys.statusRunning;
let keySavedScripts: string = storage.keys.savedScripts;

const isShowRunButton = computed(() =>
  recordedScript.value.length === 0
)
const isShowFormSave = computed(() =>
  recordedScript.value.length !== 0
);

const run = (): void => {
  isRunning.value = !isRunning.value;
  storage.setLocalStorage(keyIsRunningStorage, isRunning.value);
  if (isRunning.value) {
    script.recordScript();
    return;
  }
  script.saveScript(async (documentScript: Array<any>) => {
    if (documentScript.length === 0) {
      return
    }
    if (documentScript[0].result.length === 0) {
      return
    }
    recordedScript.value = documentScript[0].result;
  });
}

const removeRecordedScript = () => {
  recordedScript.value = [];
}

const onSaveScript = async (scriptName: string) => {
  let storageSavedScripts: Record<string, any> = await storage.getLocalStorage(keySavedScripts);
  let scripts = storageSavedScripts[keySavedScripts] ?? [];
  scripts.push({
    name: scriptName,
    scripts: toRaw(recordedScript.value),
  });
  await storage.setLocalStorage(keySavedScripts, scripts);
  removeRecordedScript();
}
onMounted(async () => {
  let storageRunning: Record<string, any> | undefined = await storage.getLocalStorage(keyIsRunningStorage);
  if (storageRunning === undefined) {
    return
  }
  isRunning.value = storageRunning[keyIsRunningStorage]
})

onBeforeUnmount(() => {
  script.destroyRecordScript();
})
</script>

<template>
  <div class="record-script">
    <div class="record-script__container">
      <run-button
        v-show="isShowRunButton"
        :text="'Record script'"
        :text-stop="'Stop'"
        :is-running="isRunning"
        @run="run"
      />
      <save-script-form
        v-show="isShowFormSave"
        @save-script="onSaveScript"
      />
    </div>
  </div>
</template>

<style>
@import './style.scss';
</style>