<script setup>
import bighead from '@/assets/bighead.png'

const openShioriHome = () => {
  window.open('https://space.bilibili.com/1609526545', '_blank');
}
</script>

<template>
  <section class="content">
    <el-image @click="openShioriHome" :src="bighead" class="big-head-container" fit="cover"/>
    <h1 class="pig-name">栞栞shiori</h1>
    <div class="ttk">❤獭獭栞的家❤</div>
  </section>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
}

.big-head-container {
  border-radius: 50%;
  width: 550px;
  min-width: 550px;
  height: 550px;
  margin-top: 80px;
  border: 5px solid rgba(74, 144, 226, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.big-head-container:hover {
  transform: scale(1.05);
}

.pig-name {
  width: 100%;
  margin-top: 30px;
  color: #4a90e2;
  font-weight: bold;
  font-size: 40px;
}

.ttk {
  width: 100%;
  margin-top: 20px;
  color: #7db4d4;
  font-size: 21px;
}
</style>
