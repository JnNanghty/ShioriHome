<script setup>
import {clothes} from "../../assets/clothes.js";
import {useRouter} from "vue-router";

const router = useRouter();
const viewDetail = (index) => {
  router.push({
    path: '/clothes/detail',
    query: {
      index
    }
  })
}
</script>

<template>
  <div>
    <h1 class="content-title">小栞衣柜</h1>
    <div class="clothes-list">
      <div class="my-card" v-for="(item, index) in clothes" @click="viewDetail(index)">
        <div class="clothes-image-wrap">
          <el-image class="clothes-image" :src="`src/assets/clothes/${item.folder}/${item.name}.png`" fit="cover"/>
        </div>
        <div class="clothes-name">{{ item.name }}</div>
        <div class="clothes-date">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clothes-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 30px auto 0;
  gap: 40px;
}



.clothes-image-wrap {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  border: 4px solid rgba(74, 144, 226, 0.3);
  box-shadow: 0 8px 30px rgba(74, 144, 226, 0.2);
}

.clothes-image {
  width: 100%;
  height: 100%;
}

.clothes-name {
  margin-top: 20px;
  color: #4a90e2;
  font-weight: bold;
  font-size: 24px;
}

.clothes-date {
  margin-top: 10px;
  color: #7db4d4;
  font-size: 18px;
}
</style>
