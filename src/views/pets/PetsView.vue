<script setup>
import {pets} from "../../assets/pets.js";
import {useRouter} from "vue-router";
const modules = import.meta.glob('@/assets/**/**/*.png', { eager: true, import: 'default' })
const router = useRouter();
const viewDetail = (key) => {
  router.push({
    path: "/pets/detail",
    query: {
      key
    }
  });
}
</script>

<template>
  <div>
    <h1 class="content-title">栞栞家的小动物</h1>
    <div class="pets-list">
      <div class="my-card" v-for="(item, key) in pets" @click="viewDetail(key)">
        <el-image class="pet-image" :src="modules[`/src/assets/pets/${item.name}/${item.name}.png`]" fit="cover"/>
        <div class="pet-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pets-list {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  margin: 30px auto 0;
  gap: 40px;
}

.my-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.pet-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  border: 4px solid rgba(74, 144, 226, 0.3);
  box-shadow: 0 8px 30px rgba(74, 144, 226, 0.2);
}

.pet-name {
  margin-top: 10px;
  font-size: 24px;
  color: #4a90e2;
  font-weight: bold;
}
</style>
