<script setup>

import {nextTick, ref} from "vue";

const audio = ref(null);
const src = ref("");
const playAudio = () => {
  src.value = "src/assets/voice/下头.mp4"
  nextTick(() => {
    audio.value.play();
  })
}
</script>

<template>
  <div>
    <div class="content-title">小栞按钮</div>
    <audio :src="src" ref="audio" />
    <el-button plain  size="large" @click="playAudio">好下头啊</el-button>
  </div>
</template>

<style scoped>

</style>