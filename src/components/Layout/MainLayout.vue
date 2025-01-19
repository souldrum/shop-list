<script setup lang="ts">
import AppHeader from "../Layout/Header/AppHeader.vue";
import AppFooter from "../Layout/Footer/AppFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="grid grid-rows-layout w-full">
    <AppHeader />
    <main class="w-full">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
