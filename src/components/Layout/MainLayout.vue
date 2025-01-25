<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "../Layout/Footer/AppFooter.vue";
import AppHeader from "../Layout/Header/AppHeader.vue";
</script>

<template>
  <div class="grid grid-rows-layout w-full">
    <AppHeader />
    <main class="container bg-surface w-full mx-auto px-3">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
