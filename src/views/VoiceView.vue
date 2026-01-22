<script setup>
import {voice} from "@/assets/voice.js";
import {computed, ref} from "vue";

const modules = import.meta.glob('@/assets/**/*.mp3', {eager: true, import: 'default'})
const playAudio = (url) => {
  const audio = new Audio(modules[`/src/assets/voice/${url}`])
  audio.play()
}

const isPlaying = ref(false)
const randomText = computed(() => isPlaying.value ? '我的电脑里住不下这么多小栞' : '点一下就会出现好多小栞')
const randomPlay = async () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    let keys = Object.keys(modules)
    while (true) {
      if (!isPlaying.value) {
        break
      }
      const index = Math.floor(Math.random() * keys.length)
      let audioUrl = modules[keys[index]]
      const audio = new Audio(audioUrl);
      audio.play()
      await delay(500)
    }
  }
}

const delay = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}
</script>

<template>
  <div>
    <div class="content-title">小栞按钮</div>
    <div class="random-bar">
      <el-button
          plain
          size="large"
          :type="isPlaying ? 'danger' : 'primary'"
          @click="randomPlay">
        {{ randomText }}
      </el-button>
    </div>
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

.random-bar {
  margin-top: 20px;
  text-align: center;
}
</style>
