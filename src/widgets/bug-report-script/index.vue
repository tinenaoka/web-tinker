<script setup lang="ts">
import {RunButton} from '../../shared/ui/run-button'
import {Ref, ref, reactive, Reactive} from 'vue';
import {useFeatureBugReportScript} from '../../features/bug-script';

let bugReportScript = useFeatureBugReportScript;

let bugReportScriptCurrent = <Reactive<any>>reactive({
  value: []
});

const isShowRunButton = <Ref>ref(true);

const onRecordBug = async () => {
  bugReportScriptCurrent.value = await bugReportScript.getBugReportScript();
  if (bugReportScriptCurrent.value.length === 0) {
    return
  }
  isShowRunButton.value = false;
}
</script>

<template>
  <div class="bug-report-script">
    <div class="bug-report-script__container">
      <run-button
        v-show="isShowRunButton"
        :text="'Record bug'"
        @run="onRecordBug"
      />
    </div>
  </div>
</template>

<style>
@import "style.scss";
</style>