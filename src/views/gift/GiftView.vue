<script setup>
import {gift} from "../../assets/gift.js";
import {useRouter} from "vue-router";

const router = useRouter();
const viewMonth = (year) => {
  router.push({
    path: "/gift/month",
    query: {
      year
    }
  });
}
</script>

<template>
  <div>
    <h1 class="content-title">舰礼存档</h1>
    <div>
      <div class="my-card" v-for="(item,key) in gift" @click="viewMonth(key)">
        {{ key }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-card {
  width: 300px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  text-align: center;
  color: #4a90e2;
  font-weight: bold;
  font-size: 32px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.my-card:hover {
  box-shadow: 0 10px 35px rgba(74, 144, 226, 0.2);
  background: rgba(74, 144, 226, 0.05);
}
</style>
