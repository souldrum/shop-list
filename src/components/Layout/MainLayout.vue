<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "../Layout/Footer/AppFooter.vue";
import AppHeader from "../Layout/Header/AppHeader.vue";
</script>

<template>
  <div class="grid grid-rows-layout w-full">
    <AppHeader />
    <main class="w-full px-4">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
