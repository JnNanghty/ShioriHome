<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {clothes} from "../../assets/clothes.js";

const router = useRouter();
const route = useRoute();
const clothesData = ref(null)
const srcList = ref([])
const modules = import.meta.glob('@/assets/**/**/*.png', { eager: true, import: 'default' })

onMounted(() => {
  clothesData.value = clothes[+route.query.index];
  srcList.value = clothesData.value.images.map(item => `@/assets/clothes/${clothesData.value.folder}/${item}`)
})
</script>

<template>
  <div>
    <div class="router-nav">
      <el-button class="back-button" plain round size="large" type="primary" @click="router.back()">
        <el-icon>
          <Back/>
        </el-icon>
        返回衣柜
      </el-button>
    </div>
    <template v-if="clothesData">
      <h2 class="clothes-name">{{ clothesData.name }}</h2>
      <div class="clothes-date">发布时间：{{ clothesData.date }}</div>
      <div class="image-list">
        <div class="my-card"
             v-for="(item, index) in clothesData.images">
          <div class="image-wrap">
            <el-image :src="modules[`/src/assets/clothes/${clothesData.folder}/${item}`]"
                      :fit="['初始小栞_3.png'].includes(item) ? 'contain' : 'cover'"
                      :preview-src-list="srcList"
                      :initial-index="index"
                      :preview-teleported="true"/>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.clothes-name {
  margin-top: 30px;
  text-align: center;
}

.clothes-date {
  margin-top: 10px;
  text-align: center;
}

.image-list {
  margin: 40px auto 0;
  display: flex;
  max-width: 1200px;
  gap: 40px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.my-card {
  width: calc(33% - 40px);
  aspect-ratio: 3 / 4;
  cursor: pointer;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.image-wrap {
  height: 100%;
}

/* 旋转， 感觉没啥用 */
/*@keyframes rotateX3d {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.image-item:hover .image-wrap {
  animation: rotateX3d 2s linear infinite;
}*/

.router-nav {
  text-align: center;
}

.back-button {
  margin: 10px auto 0;
}
</style>
