<script setup>
import {voice} from "@/assets/voice.js";

const modules = import.meta.glob('@/assets/**/*.mp3', {eager: true, import: 'default'})
const playAudio = (url) => {
  const audio = new Audio(modules[`/src/assets/voice/${url}`])
  audio.play()
}
</script>

<template>
  <div>
    <div class="content-title">小栞按钮</div>
    <div class="voice-content">
      <div v-for="item in voice" class="voice-item">
        <el-button plain size="large" type="primary" @click="playAudio(item.url)">{{ item.name }}</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.voice-content {
  display: flex;
  margin: 30px auto;
  width: 1200px;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
