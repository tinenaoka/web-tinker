<script setup lang="ts">
import {RangeFieldRefsInterface} from '../../model';
import {reactive} from 'vue';

interface RangeFieldProps {
  range: RangeFieldRefsInterface,
  idx: number
}

const props = defineProps<RangeFieldProps>();

const emits = defineEmits(['change-values'])
const range = Object.assign({}, props.range);
let stylesSliderTrack = reactive({
  left: '0px',
  width: '100%',
});

const onInputSlider = () => {
  const min = +range.valueMin.value;
  const max = +range.valueMax.value;

  if (min > max - range.step) {
    range.valueMin.value = max - range.step;
  }
  if (max < min + range.step) {
    range.valueMax.value = min + range.step;
  }
  const percentMin = ((range.valueMin.value - range.min) / (range.max - range.min)) * 100;
  const percentMax = ((range.valueMax.value - range.min) / (range.max - range.min)) * 100;

  stylesSliderTrack.left = `${percentMin}%`;
  stylesSliderTrack.width = `${percentMax - percentMin}%`;

  emits('change-values', {
    min: +range.valueMin.value,
    max: +range.valueMax.value,
    idx: props.idx
  })
}


</script>

<template>
  <div class="range-filed">
    <slot name="placeholder-min"></slot>
    <div class="range-slider">
      <input
        ref="range-min"
        type="range"
        v-model="range.valueMin.value"
        :step="range.step"
        :min="range.min"
        :max="range.max"
        @input="onInputSlider"
      >
      <input
        ref="range-max"
        type="range"
        v-model="range.valueMax.value"
        :step="range.step"
        :min="range.min"
        :max="range.max"
        @input="onInputSlider"
      >
      <div
        ref="slider"
        class="slider-track"
        :style="stylesSliderTrack"
      >
        <slot name="current-value-min"></slot>
        <slot name="current-value-max"></slot>
      </div>
    </div>
    <slot name="placeholder-max"></slot>
  </div>
</template>

<style>
@import './style.scss';
</style>