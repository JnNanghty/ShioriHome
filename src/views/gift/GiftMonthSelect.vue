<script setup>
import {gift} from "../../assets/gift.js";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter();
const route = useRoute();
const giftData = ref(null)
const year = ref(null)
onMounted(() => {
  year.value = route.query.year;
  giftData.value = gift[year.value];
})

const viewDetail = (month) => {
  router.push({
    path: "/gift/detail",
    query: {
      year: year.value,
      month
    }
  })
}
</script>

<template>
  <div>
    <template v-if="giftData">
      <div class="router-nav">
        <el-button class="back-button" plain round size="large" type="primary" @click="router.back()">
          <el-icon>
            <Back/>
          </el-icon>
          返回年份选择
        </el-button>
      </div>
      <div class="content-title">{{ year }}年舰礼存档</div>
      <div class="month-list">
        <div v-for="item in 12"
             @click="viewDetail(item)"
             class="my-card"
             :class="{
               'disabled-month': !giftData[item]
             }">
          {{ item }}月
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.router-nav {
  text-align: center;
}

.back-button {
  margin: 10px auto 0;
}

.month-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 800px;
  margin: 30px auto;
}

.my-card {
  width: calc(30% - 60px);
  margin-bottom: 30px;
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

.disabled-month {
  pointer-events: none;
  cursor: not-allowed;
  background: #e0e0e0;
  opacity: 0.6;
  color: #999999;
}

</style>