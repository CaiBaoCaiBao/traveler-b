<template>
  <main id="main-container">
    <div id="container-content">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
#main-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

#container-content {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  #main-container {
    padding: 18px;
  }
}

@media (max-width: 992px) {
  #main-container {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  #main-container {
    padding: 12px;
  }
}

@media (max-width: 576px) {
  #main-container {
    padding: 10px;
  }
}
</style>