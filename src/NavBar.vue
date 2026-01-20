<script setup>
import {routes} from './router';
import {ref} from "vue";

const activeIndex = ref('/');
</script>

<template>
  <el-menu
      class="nav-bar"
      :default-active="activeIndex"
      mode="horizontal"
      :router="true">
    <el-menu-item
        v-for="item in routes"
        :index="item.path">
      {{ item.meta.title }}
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.nav-bar {
  justify-content: center;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  --el-menu-border-color: rgba(0, 0, 0, 0.05);
}
</style>
