<script setup>
import {danmu} from "@/assets/spamer.js";
import {nextTick, ref, useTemplateRef} from "vue";
import {ElMessage} from "element-plus";

const goLiveRoom = () => {
  window.open('https://live.bilibili.com/26966466')
}

const copyText = ref('')
const copyDom = useTemplateRef('copy-dom')
const copy = async (name) => {
  copyText.value = name;
  await nextTick();
  try {
    await navigator.clipboard.writeText(name)
    ElMessage({
      message: '已复制到剪切板',
      type: 'success',
      plain: true
    })
  } catch (e) {
    const selection = window.getSelection();
    const range = document.createRange();
    // 选中目标元素的所有文本
    range.selectNodeContents(copyDom.value);
    // 更新选区
    selection.removeAllRanges();
    selection.addRange(range);
    const result = document.execCommand('copy');
    window.getSelection().removeAllRanges();
    if (result) {
      ElMessage({
        message: '已复制到剪切板',
        type: 'success',
        plain: true
      })
    } else {
      ElMessage({
        message: '复制失败，没有权限',
        type: 'error',
        plain: true
      })
    }
  }
}
</script>

<template>
  <div>
    <span ref="copy-dom" class="hidden-copy-dom">{{ copyText }}</span>
    <h1 class="content-title" @click="goLiveRoom">栞栞Shiori的直播间</h1>
    <div class="live-wrap">
      <iframe style="width: 700px;height: 400px;"
              src="https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=26966466&quality=0"
              frameborder="no" framespacing="0" scrolling="no" allow="autoplay; encrypted-media"
              allowfullscreen="true"></iframe>
    </div>
    <h2 class="title-3">唱歌专用独轮车</h2>
    <ul style="text-align: center;line-height: 24px;">
      <li v-for="item in danmu" style="margin-bottom: 10px;">
        <span style="margin-right: 20px;">{{ item }}</span>
        <el-button size="default" @click="copy(item)">复制</el-button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content-title {
  cursor: pointer;
}

.title-3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.live-wrap {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.hidden-copy-dom {
  position: absolute;
  top: -9999999px;
  left: -99999999px;
  opacity: .1;
}
</style>
