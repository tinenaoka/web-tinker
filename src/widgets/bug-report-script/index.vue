<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {Ref, ref, reactive, Reactive} from 'vue';
import {useFeatureBugReportScript} from '../../features/bug-script';
import {SaveScriptForm} from './ui/save-script-form/index';
import {ScriptBug} from '../../../entities';

let bugReportScript = useFeatureBugReportScript;

let bugReportScriptCurrent = <Reactive<any>>reactive({
  value: Array<ScriptBug>
});

let timeStamp = <Reactive<any>>reactive({
  min: 0,
  max: 0
})

const isShowRunButton = <Ref>ref(true);
const isShowBugReportForm = <Ref>ref(false);

const onRecordBug = async () => {
  bugReportScriptCurrent.value = await bugReportScript.getBugReportScript();
  if (bugReportScriptCurrent.value.length === 0) {
    return
  }
  isShowRunButton.value = false;
  isShowBugReportForm.value = true;
  timeStamp.min = bugReportScriptCurrent.value[0].timeStamp;
  timeStamp.max = bugReportScriptCurrent.value[bugReportScriptCurrent.value.length - 1].timeStamp;
}

const onSaveBug = async (scriptData: {name: string, timeStamp: Array<number>}) => {
  await bugReportScript.saveBugReportScript(scriptData.name, scriptData.timeStamp);
  await bugReportScript.clearBugReportScript();
  isShowRunButton.value = true;
  isShowBugReportForm.value = false;
}
</script>

<template>
  <div class="bug-report-script">
    <div class="bug-report-script__container">
      <run-button
        v-if="isShowRunButton"
        :text="'Record bug'"
        @run="onRecordBug"
      />
      <save-script-form
        v-if="isShowBugReportForm"
        :time-stamp="timeStamp"
        @save-script="onSaveBug"
      />
    </div>
  </div>
</template>

<style>
@import "style.scss";
</style>