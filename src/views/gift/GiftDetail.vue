<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {gift} from "../../assets/gift.js";

const router = useRouter();
const route = useRoute();
const year = ref(null)
const month = ref(null)
const giftData = computed(() => {
  return month.value ? gift[year.value][month.value] : {};
})

onMounted(() => {
  year.value = route.query.year;
  month.value = route.query.month;
})
const subMonth = () => {
  const months = Object.keys(gift[year.value])
  const index = months.indexOf(month.value)
  if (index > 0) {
    month.value = months[index - 1];
  } else {
    const _year = year.value - 1
    if (_year >= 2023) {
      year.value = _year;
      const keys = Object.keys(gift[_year]);
      month.value = keys[keys.length - 1]
    }
  }
}
const addMonth = () => {
  const months = Object.keys(gift[year.value])
  const index = months.indexOf(month.value)
  if (index < months.length - 1) {
    month.value = months[index + 1];
  } else {
    const _year = year.value + 1
    if (_year < 2026) {
      year.value = _year;
      const keys = Object.keys(gift[_year]);
      month.value = keys[0]
    }
  }
}

const routerToVideo = (url) => {
  window.open(url, "_blank");
}
</script>

<template>
  <div>
    <div class="router-nav">
      <el-button class="back-button" plain round size="large" type="primary" @click="router.back()">
        <el-icon>
          <Back/>
        </el-icon>
        返回月份选择
      </el-button>
    </div>
    <div class="gift-list">
      <div class="nav-switch">
        <el-button plain round size="large" type="primary" @click="subMonth">
          <el-icon>
            <Back/>
          </el-icon>
          上个月
        </el-button>
        <el-button plain round size="large" type="primary" @click="addMonth">
          下个月
          <el-icon>
            <Right/>
          </el-icon>
        </el-button>
      </div>
      <h2 class="content-title">{{ year }}年{{ month }}月舰礼</h2>
      <div class="gift-content">
        <div v-for="item in giftData" class="gift-item my-card">
          <el-image :src="`src/assets/gift/${item.image}`" fit="cover"/>
          <el-divider/>
          <div class="link-row">
            <div class="gift-name">{{ item.name }}</div>
            <div v-if="item.videoUrl" class="gift-link">
              <el-button plain round type="primary" @click="routerToVideo(item.videoUrl)">实物展示</el-button>
            </div>
          </div>
          <div v-if="item.videoUrls" class="link-row">
            <div v-for="video in item.videoUrls" class="gift-link">
              <el-button plain round type="primary" @click="routerToVideo(video.url)">{{ video.name }}</el-button>
            </div>
          </div>
          <div class="gift-time">活动时间{{ item.activityTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-nav {
  text-align: center;
}

.back-button {
  margin: 10px auto 0;
}

.gift-list {
  width: 1200px;
  margin: 30px auto;
}

.nav-switch {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.gift-content {
  margin-top: 30px;
}

.gift-item {
  padding: 20px;
  background: white;
  border-radius: 20px;
  margin-bottom: 20px;
}

.gift-name {
  color: #4a90e2;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.link-row {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
}

.gift-link {
}

.gift-time {
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  color: #7db4d4;
}
</style>