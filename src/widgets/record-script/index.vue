<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {SaveScriptForm} from '../../pages/index-page/ui/save-script-form'
import {onMounted, Ref, ref, computed, Reactive, reactive} from 'vue';
import {useFeatureRecordScript} from '../../features/record-script'
import {useFeatureRecordLocalStorage} from '../../../chrome/storage';

let script = useFeatureRecordScript;
let storage = useFeatureRecordLocalStorage;

let isRunning = <Ref>ref(false);
let recordedScript = <Reactive<any>>reactive({
  value: []
});
let keyIsRunningStorage: string = storage.keys.statusRunning;

const isShowRunButton = computed(() =>
  recordedScript.value.length === 0
)
const isShowFormSave = computed(() =>
  recordedScript.value.length !== 0
);

const run = async (): Promise<void> => {
  isRunning.value = !isRunning.value;
  if (isRunning.value) {
    await script.recordScript();
    return;
  }
  let savedScript = await script.saveScript();
  recordedScript.value = savedScript ?? [];
}

const removeRecordedScript = (): void => {
  recordedScript.value = [];
}

const onSaveScript = async (scriptName: string): Promise<void> => {
  await script.addScriptItem(scriptName);
  removeRecordedScript();
}
onMounted(async (): Promise<void> => {
  let isRunningStore: unknown = await storage.getLocalStorage(keyIsRunningStorage);
  if (isRunningStore === null) {
    return
  }
  isRunning.value = isRunningStore
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