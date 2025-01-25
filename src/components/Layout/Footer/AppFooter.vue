<script setup lang="ts">
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<template>
  <footer
    class="flex justify-center bg-primary-fixed-dim text-primary px-4 py-1"
  >
    <div class="container flex flex-col items-center">
      <span>souldrum</span>
      <span>{{ year }}</span>
    </div>
  </footer>
</template>
