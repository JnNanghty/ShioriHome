<script setup>
import NavBar from "./NavBar.vue";
</script>

<template>
  <el-container class="app-container">
    <el-header class="header-container">
      <NavBar/>
    </el-header>
    <el-main class="main">
      <router-view v-slot="{Component}">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </el-main>
    <el-footer>© 栞栞shiori 个人主页</el-footer>
  </el-container>
</template>

<style scoped>
.app-container {
  height: 100%;
}

.header-container {
  padding: 0;
}

.main {
  overflow-x: hidden;
}

footer {
  box-sizing: content-box;
  border-top: 1px solid rgba(74, 144, 226, 0.2);
  text-align: center;
  color: #7db4d4;
  line-height: var(--el-footer-height);
}
</style>
