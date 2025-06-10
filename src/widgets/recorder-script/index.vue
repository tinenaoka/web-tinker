<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {SaveScriptForm} from './ui/save-script-form'
import {computed, onMounted, reactive, ref, Ref} from 'vue';
import {useFeatureRecordScript} from '../../features/record-script'
import {useFeatureListScript} from '../../features/list-script';
import {useFeatureRunScript} from '../../features/run-script';
import {Script} from '../../../entities';

let script = useFeatureRecordScript;
let listScript = useFeatureListScript;
let runScript = useFeatureRunScript;
interface ReactiveScript {
  value: Script[] | []
}

let isRunning = <Ref<boolean>>ref(false);
let recordedScript = <ReactiveScript>reactive({
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
  await listScript.addRecordedScriptItem(scriptName);
  removeRecordedScript();
}
onMounted(async (): Promise<void> => {
  let isRunningStore = await runScript.getStatusRunning();
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