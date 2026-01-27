<script setup>
const goLiveRoom = () => {
  window.open('https://live.bilibili.com/26966466')
}
</script>

<template>
  <div>
    <h1 class="content-title" @click="goLiveRoom">栞栞Shiori的直播间</h1>
    <div class="live-wrap">
      <iframe style="width: 700px;height: 400px;"
              src="https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=26966466&quality=0"
              frameborder="no" framespacing="0" scrolling="no" allow="autoplay; encrypted-media"
              allowfullscreen="true"></iframe>
    </div>
  </div>
</template>

<style scoped>
.content-title {
  cursor: pointer;
}

.live-wrap {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>