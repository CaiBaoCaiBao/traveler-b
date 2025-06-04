

<template>
  <main id="main-container">
    <div id="main-content">
        <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
#main-container{
    display: flex;
    justify-content: center;
}

#main-content{
    width:1280px;
}
</style>