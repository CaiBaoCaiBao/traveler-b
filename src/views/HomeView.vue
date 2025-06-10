<template>
  <Container>
    <button>
      <RouterLink to="/login">Login</RouterLink>
    </button>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/ContainerSpace.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
