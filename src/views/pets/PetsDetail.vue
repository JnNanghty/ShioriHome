<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {pets} from "@/assets/pets.js";
const modules = import.meta.glob('@/assets/**/**/*.png', { eager: true, import: 'default' })

const route = useRoute();
const router = useRouter();
const petData = ref(null)
onMounted(() => {
  petData.value = pets[route.query.key]
})
</script>

<template>
  <div>
    <div class="router-nav">
      <el-button class="back-button" plain round size="large" type="primary" @click="router.back()">
        <el-icon>
          <Back/>
        </el-icon>
        返回列表
      </el-button>
    </div>

    <template v-if="petData">
      <div class="pet-image">
        <el-image :src="modules[`/src/assets/${petData.detailImage}`]"/>
      </div>
      <div class="description-card">
        <h2 class="pet-name">{{ petData.name }}</h2>
        <div class="pet-desc">
          <div>
            <div class="form-item"><span class="form-label">性别：</span>{{ petData.gender }}</div>
            <div class="form-item"><span class="form-label">品种：</span>{{ petData.breed }}</div>
            <div class="form-item"><span class="form-label">出生：</span>{{ petData.birthDate }}</div>
            <div class="form-item"><span class="form-label">绝育：</span>{{ petData.neuterDate }}</div>
          </div>
        </div>
        <el-divider/>
        <div>
          {{ petData.description }}
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

.description-card {
  font-size: 18px;
  width: 800px;
  margin: 30px auto 0;
  background: white;
  padding: 30px;
  border-radius: 20px;
}

.pet-name {
  color: rgb(74, 144, 226);
  text-align: center;
  font-size: 24px;
}

.pet-image {
  margin: 30px auto;
  text-align: center;
  max-width: 600px;
  border-radius: 20px;
  overflow: hidden;
}

.pet-desc {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  color: #7db4d4;
  font-weight: bold;
  margin-right: 10px;
}

.form-item {
  margin-bottom: 10px;
}
</style>
