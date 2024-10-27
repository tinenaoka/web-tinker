<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {SaveScriptForm} from './ui/form-save-script'
import {computed, onMounted, Reactive, reactive, ref, Ref} from 'vue';
import {useFeatureRecordScript} from '../../features/record-script'
import {useFeatureListScript} from '../../features/list-script';
import {useFeatureRunScript} from '../../features/run-script';

let script = useFeatureRecordScript;
let listScript = useFeatureListScript;
let runScript = useFeatureRunScript;

let isRunning = <Ref>ref(false);
let recordedScript = <Reactive<any>>reactive({
  value: []
});

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
  await listScript.addScriptItem(scriptName);
  removeRecordedScript();
}
onMounted(async (): Promise<void> => {
  let isRunningStore: boolean | null = await runScript.getStatusRunning();
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