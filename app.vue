<script lang="ts" setup>
import './assets/css/tailwind.css';
const config = useAppConfig();
</script>

<template>
  <title>{{ config.title }}</title>
  <div class="flex">
    <NuxtPage />
  </div>
</template>
